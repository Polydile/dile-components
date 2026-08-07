#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rutas de directorios
const MATERIAL_ICONS_DIR = path.join(__dirname, '..', 'src-icons/material/src');
const COMPONENTS_OUTPUT_DIR = path.join(__dirname, '..', 'packages', 'iconlib', 'material-icons');

/**
 * Convierte el nombre de carpeta del icono a nombre de clase de componente
 * Ejemplo: "3d_rotation" -> "DileIconlib3dRotation"
 */
function iconFolderNameToClassName(iconName) {
  const pascalCase = iconName
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

  return `DileIconlib${pascalCase}`;
}

/**
 * Convierte el nombre de carpeta del icono a nombre de elemento personalizado
 * Ejemplo: "3d_rotation" -> "dile-material-icon-3d-rotation"
 */
function iconFolderNameToCustomElementName(iconName) {
  const kebabName = iconName.replace(/_/g, '-');
  return `dile-material-icon-${kebabName}`;
}

/**
 * Convierte el nombre de carpeta del icono a nombre de archivo de componente
 * Ejemplo: "3d_rotation" -> "3d-rotation.js"
 */
function iconFolderNameToFileName(iconName) {
  return `${iconName.replace(/_/g, '-')}.js`;
}

/**
 * Recorre recursivamente las categorías de Material Icons y devuelve
 * una entrada por cada carpeta de icono encontrada, junto con la ruta
 * donde debería estar su variante "materialicons/24px.svg".
 */
function findMaterialIconEntries() {
  const categories = fs.readdirSync(MATERIAL_ICONS_DIR, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name);

  const iconEntries = [];

  categories.forEach(category => {
    const categoryPath = path.join(MATERIAL_ICONS_DIR, category);
    const iconNames = fs.readdirSync(categoryPath, { withFileTypes: true })
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name);

    iconNames.forEach(iconName => {
      const svgFilePath = path.join(categoryPath, iconName, 'materialicons', '24px.svg');
      iconEntries.push({ category, iconName, svgFilePath });
    });
  });

  return iconEntries;
}

/**
 * Lee el contenido SVG y lo limpia para usar en el componente.
 * Además, inyecta fill="currentColor" en la etiqueta raíz <svg> ya que
 * los iconos de Material son "fill-based" (a diferencia de los de Lucide,
 * que ya traen stroke="currentColor"). Así heredan --dile-icon-color.
 * El path del hitbox (fill="none") no se ve afectado porque ya trae
 * su propio atributo fill explícito.
 */
function processSvgContent(svgFilePath) {
  const svgContent = fs.readFileSync(svgFilePath, 'utf8');

  const cleanedSvg = svgContent
    .replace(/\n/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  const svgWithCurrentColor = cleanedSvg.replace(/^<svg /, '<svg fill="currentColor" ');

  return svgWithCurrentColor;
}

/**
 * Genera el código del componente
 */
function generateComponentCode(className, customElementName, svgContent) {
  return `import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class ${className} extends DileBaseIcon {
  getSvgIcon() {
    return \`${svgContent}\`;
  }
}

if (!customElements.get('${customElementName}')) {
  customElements.define('${customElementName}', ${className});
}
`;
}

/**
 * Función principal que genera todos los componentes
 */
function generateComponents() {
  console.log('🚀 Iniciando generación de componentes de iconos Material...\n');

  if (!fs.existsSync(MATERIAL_ICONS_DIR)) {
    console.error(`❌ Error: No se encontró el directorio ${MATERIAL_ICONS_DIR}`);
    process.exit(1);
  }

  if (!fs.existsSync(COMPONENTS_OUTPUT_DIR)) {
    fs.mkdirSync(COMPONENTS_OUTPUT_DIR, { recursive: true });
    console.log(`📁 Creado directorio: ${COMPONENTS_OUTPUT_DIR}`);
  }

  const iconEntries = findMaterialIconEntries();

  console.log(`📋 Encontradas ${iconEntries.length} carpetas de iconos\n`);

  let successCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  iconEntries.forEach((entry, index) => {
    const { category, iconName, svgFilePath } = entry;

    if (!fs.existsSync(svgFilePath)) {
      console.warn(`⚠️  ${index + 1}/${iconEntries.length} - Omitido (sin materialicons/24px.svg): ${category}/${iconName}`);
      skippedCount++;
      return;
    }

    try {
      const className = iconFolderNameToClassName(iconName);
      const customElementName = iconFolderNameToCustomElementName(iconName);
      const svgContent = processSvgContent(svgFilePath);

      const componentCode = generateComponentCode(className, customElementName, svgContent);

      const componentFileName = iconFolderNameToFileName(iconName);
      const componentFilePath = path.join(COMPONENTS_OUTPUT_DIR, componentFileName);

      fs.writeFileSync(componentFilePath, componentCode, 'utf8');

      console.log(`✅ ${index + 1}/${iconEntries.length} - Generado: ${componentFileName}`);
      successCount++;

    } catch (error) {
      console.error(`❌ Error procesando ${iconName}:`, error.message);
      errorCount++;
    }
  });

  console.log(`\n🎉 Generación completada!`);
  console.log(`✅ Componentes generados exitosamente: ${successCount}`);
  if (skippedCount > 0) {
    console.log(`⚠️  Iconos omitidos (sin estilo materialicons disponible): ${skippedCount}`);
  }
  if (errorCount > 0) {
    console.log(`❌ Errores: ${errorCount}`);
  }
  console.log(`📁 Ubicación: ${COMPONENTS_OUTPUT_DIR}`);
}

// Ejecutar el script
generateComponents();
