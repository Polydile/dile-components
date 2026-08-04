#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rutas de directorios
const TABLER_ICONS_DIR = path.join(__dirname, '..', 'src-icons/tabler-icons');
const COMPONENTS_OUTPUT_DIR = path.join(__dirname, '..', 'packages', 'iconlib', 'tabler-icons');

// Tabler tiene 2 variantes por icono, en carpetas separadas, con el mismo
// nombre de archivo en ambas ("outline" es la variante por defecto de la
// librería, sin sufijo; "filled" añade el sufijo "-filled" al nombre para
// no colisionar, siguiendo la misma convención que Phosphor).
const VARIANTS = [
  { folder: 'outline', suffix: '' },
  { folder: 'filled', suffix: '-filled' },
];

/**
 * Convierte el nombre de archivo SVG (+ sufijo de variante) a nombre de clase de componente
 * Ejemplo: "a-b-2.svg" + "" -> "DileIconlibAB2"; "heart.svg" + "-filled" -> "DileIconlibHeartFilled"
 */
function svgFileNameToClassName(fileName, suffix) {
  const nameWithoutExtension = fileName.replace('.svg', '') + suffix;

  const pascalCase = nameWithoutExtension
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

  return `DileIconlib${pascalCase}`;
}

/**
 * Convierte el nombre de archivo SVG (+ sufijo de variante) a nombre de elemento personalizado
 * Ejemplo: "heart.svg" + "-filled" -> "dile-tabler-icon-heart-filled"
 */
function svgFileNameToCustomElementName(fileName, suffix) {
  const nameWithoutExtension = fileName.replace('.svg', '') + suffix;
  return `dile-tabler-icon-${nameWithoutExtension}`;
}

/**
 * Lee el contenido SVG y lo limpia para usar en el componente.
 * Los SVGs de Tabler traen un bloque de comentario HTML con metadata
 * (category/tags/version/unicode) antes del <svg> que no es necesario en el
 * componente final, así que se elimina. El propio <svg> ya trae
 * stroke="currentColor" (outline, viewBox 24, igual que Lucide) o
 * fill="currentColor" (filled) según corresponda, así que no hace falta
 * inyectar nada.
 */
function processSvgContent(svgFilePath) {
  const svgContent = fs.readFileSync(svgFilePath, 'utf8');

  const withoutLeadingComment = svgContent.replace(/^\s*<!--[\s\S]*?-->\s*/, '');

  const cleanedSvg = withoutLeadingComment
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
 * Función principal que genera todos los componentes
 */
function generateComponents() {
  console.log('🚀 Iniciando generación de componentes de iconos Tabler...\n');

  if (!fs.existsSync(COMPONENTS_OUTPUT_DIR)) {
    fs.mkdirSync(COMPONENTS_OUTPUT_DIR, { recursive: true });
    console.log(`📁 Creado directorio: ${COMPONENTS_OUTPUT_DIR}`);
  }

  let successCount = 0;
  let errorCount = 0;
  let totalFiles = 0;

  VARIANTS.forEach(({ folder, suffix }) => {
    const variantDir = path.join(TABLER_ICONS_DIR, folder);

    if (!fs.existsSync(variantDir)) {
      console.error(`❌ Error: No se encontró el directorio ${variantDir}`);
      process.exit(1);
    }

    const svgFiles = fs.readdirSync(variantDir).filter(file => file.endsWith('.svg'));
    totalFiles += svgFiles.length;

    svgFiles.forEach((svgFile, index) => {
      try {
        const svgFilePath = path.join(variantDir, svgFile);
        const className = svgFileNameToClassName(svgFile, suffix);
        const customElementName = svgFileNameToCustomElementName(svgFile, suffix);
        const svgContent = processSvgContent(svgFilePath);

        const componentCode = generateComponentCode(className, customElementName, svgContent);

        const componentFileName = svgFile.replace('.svg', '') + suffix + '.js';
        const componentFilePath = path.join(COMPONENTS_OUTPUT_DIR, componentFileName);

        if (fs.existsSync(componentFilePath)) {
          console.warn(`⚠️  Colisión de nombre, sobrescribiendo: ${componentFileName} (variante: ${folder})`);
        }

        fs.writeFileSync(componentFilePath, componentCode, 'utf8');

        console.log(`✅ ${folder} ${index + 1}/${svgFiles.length} - Generado: ${componentFileName}`);
        successCount++;

      } catch (error) {
        console.error(`❌ Error procesando ${folder}/${svgFile}:`, error.message);
        errorCount++;
      }
    });

    console.log(`📋 ${folder}: ${svgFiles.length} iconos procesados\n`);
  });

  console.log(`\n🎉 Generación completada!`);
  console.log(`✅ Componentes generados exitosamente: ${successCount}/${totalFiles}`);
  if (errorCount > 0) {
    console.log(`❌ Errores: ${errorCount}`);
  }
  console.log(`📁 Ubicación: ${COMPONENTS_OUTPUT_DIR}`);
}

// Ejecutar el script
generateComponents();
