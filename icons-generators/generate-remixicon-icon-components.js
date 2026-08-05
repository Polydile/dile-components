#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rutas de directorios
const REMIXICON_ICONS_DIR = path.join(__dirname, '..', 'src-icons/remix-icon');
const COMPONENTS_OUTPUT_DIR = path.join(__dirname, '..', 'packages', 'iconlib', 'remixicon-icons');

/**
 * Convierte el nombre de archivo SVG a nombre de clase de componente
 * Ejemplo: "heart-line.svg" -> "DileIconlibHeartLine"
 */
function svgFileNameToClassName(fileName) {
  const nameWithoutExtension = fileName.replace('.svg', '');

  const pascalCase = nameWithoutExtension
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

  return `DileIconlib${pascalCase}`;
}

/**
 * Convierte el nombre de archivo SVG a nombre de elemento personalizado
 * Ejemplo: "heart-line.svg" -> "dile-remixicon-icon-heart-line"
 */
function svgFileNameToCustomElementName(fileName) {
  const nameWithoutExtension = fileName.replace('.svg', '');
  return `dile-remixicon-icon-${nameWithoutExtension}`;
}

/**
 * Lee el contenido SVG y lo limpia para usar en el componente.
 * Los SVGs de Remix Icon ya traen fill="currentColor" en el <svg> raíz, así
 * que no hace falta inyectar nada (a diferencia de Material).
 */
function processSvgContent(svgFilePath) {
  const svgContent = fs.readFileSync(svgFilePath, 'utf8');

  const cleanedSvg = svgContent
    .replace(/\n/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  return cleanedSvg;
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

customElements.define('${customElementName}', ${className});
`;
}

/**
 * Recorre recursivamente las carpetas de categoría de Remix Icon (Arrows,
 * Business, Logos, ...) y devuelve la lista de rutas absolutas a cada SVG.
 * Las categorías son solo organización del origen: no afectan al nombre del
 * componente ni del tag, que se derivan únicamente del nombre de archivo
 * (que ya incluye el sufijo -line/-fill cuando aplica, y no hay colisiones
 * de nombre entre categorías).
 */
function findAllSvgFiles() {
  const categories = fs.readdirSync(REMIXICON_ICONS_DIR, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name);

  return categories.flatMap(category => {
    const categoryPath = path.join(REMIXICON_ICONS_DIR, category);
    return fs.readdirSync(categoryPath)
      .filter(file => file.endsWith('.svg'))
      .map(file => ({ category, svgFilePath: path.join(categoryPath, file), svgFile: file }));
  });
}

/**
 * Función principal que genera todos los componentes
 */
function generateComponents() {
  console.log('🚀 Iniciando generación de componentes de iconos Remix Icon...\n');

  if (!fs.existsSync(REMIXICON_ICONS_DIR)) {
    console.error(`❌ Error: No se encontró el directorio ${REMIXICON_ICONS_DIR}`);
    process.exit(1);
  }

  if (!fs.existsSync(COMPONENTS_OUTPUT_DIR)) {
    fs.mkdirSync(COMPONENTS_OUTPUT_DIR, { recursive: true });
    console.log(`📁 Creado directorio: ${COMPONENTS_OUTPUT_DIR}`);
  }

  const svgEntries = findAllSvgFiles();

  console.log(`📋 Encontrados ${svgEntries.length} archivos SVG en ${new Set(svgEntries.map(e => e.category)).size} categorías\n`);

  let successCount = 0;
  let errorCount = 0;

  svgEntries.forEach(({ category, svgFilePath, svgFile }, index) => {
    try {
      const className = svgFileNameToClassName(svgFile);
      const customElementName = svgFileNameToCustomElementName(svgFile);
      const svgContent = processSvgContent(svgFilePath);

      const componentCode = generateComponentCode(className, customElementName, svgContent);

      const componentFileName = svgFile.replace('.svg', '.js');
      const componentFilePath = path.join(COMPONENTS_OUTPUT_DIR, componentFileName);

      if (fs.existsSync(componentFilePath)) {
        console.warn(`⚠️  Colisión de nombre, sobrescribiendo: ${componentFileName} (categoría: ${category})`);
      }

      fs.writeFileSync(componentFilePath, componentCode, 'utf8');

      console.log(`✅ ${index + 1}/${svgEntries.length} - Generado: ${componentFileName} (${category})`);
      successCount++;

    } catch (error) {
      console.error(`❌ Error procesando ${category}/${svgFile}:`, error.message);
      errorCount++;
    }
  });

  console.log(`\n🎉 Generación completada!`);
  console.log(`✅ Componentes generados exitosamente: ${successCount}/${svgEntries.length}`);
  if (errorCount > 0) {
    console.log(`❌ Errores: ${errorCount}`);
  }
  console.log(`📁 Ubicación: ${COMPONENTS_OUTPUT_DIR}`);
}

// Ejecutar el script
generateComponents();
