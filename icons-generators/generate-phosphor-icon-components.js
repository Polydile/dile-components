#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rutas de directorios
const PHOSPHOR_ICONS_DIR = path.join(__dirname, '..', 'src-icons/phosphor-icons/SVGs Flat');
const COMPONENTS_OUTPUT_DIR = path.join(__dirname, '..', 'packages', 'iconlib', 'phosphor-icons');

// Los 6 pesos de Phosphor. El nombre de archivo ya lleva el peso como sufijo
// (acorn-bold.svg, acorn-duotone.svg, ...) excepto "regular" (acorn.svg), así
// que los 6 se pueden escribir en una única carpeta de salida sin colisiones.
const WEIGHTS = ['bold', 'duotone', 'fill', 'light', 'regular', 'thin'];

/**
 * Convierte el nombre de archivo SVG a nombre de clase de componente
 * Ejemplo: "acorn-bold.svg" -> "DileIconlibAcornBold"
 */
function svgFileNameToClassName(fileName) {
  const nameWithoutExtension = fileName.replace('.svg', '');

  // Convertir a PascalCase
  const pascalCase = nameWithoutExtension
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

  return `DileIconlib${pascalCase}`;
}

/**
 * Convierte el nombre de archivo SVG a nombre de elemento personalizado
 * Ejemplo: "acorn-bold.svg" -> "dile-phosphor-icon-acorn-bold"
 */
function svgFileNameToCustomElementName(fileName) {
  const nameWithoutExtension = fileName.replace('.svg', '');
  return `dile-phosphor-icon-${nameWithoutExtension}`;
}

/**
 * Lee el contenido SVG y lo limpia para usar en el componente.
 * Los iconos de "SVGs Flat" ya traen fill="currentColor" en el <svg> raíz en
 * casi todos los casos, pero un puñado no lo trae (p.ej. duotone/cricket,
 * duotone/signature), así que se inyecta solo si falta, para heredar
 * --dile-icon-color sin duplicar el atributo.
 */
function processSvgContent(svgFilePath) {
  const svgContent = fs.readFileSync(svgFilePath, 'utf8');

  const cleanedSvg = svgContent
    .replace(/\n/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  const openTagMatch = cleanedSvg.match(/^<svg\b[^>]*>/);
  const hasCurrentColor = openTagMatch && openTagMatch[0].includes('fill="currentColor"');

  return hasCurrentColor ? cleanedSvg : cleanedSvg.replace(/^<svg /, '<svg fill="currentColor" ');
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
  console.log('🚀 Iniciando generación de componentes de iconos Phosphor...\n');

  if (!fs.existsSync(PHOSPHOR_ICONS_DIR)) {
    console.error(`❌ Error: No se encontró el directorio ${PHOSPHOR_ICONS_DIR}`);
    process.exit(1);
  }

  if (!fs.existsSync(COMPONENTS_OUTPUT_DIR)) {
    fs.mkdirSync(COMPONENTS_OUTPUT_DIR, { recursive: true });
    console.log(`📁 Creado directorio: ${COMPONENTS_OUTPUT_DIR}`);
  }

  let successCount = 0;
  let errorCount = 0;
  let totalFiles = 0;

  WEIGHTS.forEach(weight => {
    const weightDir = path.join(PHOSPHOR_ICONS_DIR, weight);

    if (!fs.existsSync(weightDir)) {
      console.error(`❌ Error: No se encontró el directorio ${weightDir}`);
      process.exit(1);
    }

    const svgFiles = fs.readdirSync(weightDir).filter(file => file.endsWith('.svg'));
    totalFiles += svgFiles.length;

    svgFiles.forEach((svgFile, index) => {
      try {
        const svgFilePath = path.join(weightDir, svgFile);
        const className = svgFileNameToClassName(svgFile);
        const customElementName = svgFileNameToCustomElementName(svgFile);
        const svgContent = processSvgContent(svgFilePath);

        const componentCode = generateComponentCode(className, customElementName, svgContent);

        const componentFileName = svgFile.replace('.svg', '.js');
        const componentFilePath = path.join(COMPONENTS_OUTPUT_DIR, componentFileName);

        if (fs.existsSync(componentFilePath)) {
          console.warn(`⚠️  Colisión de nombre, sobrescribiendo: ${componentFileName} (peso: ${weight})`);
        }

        fs.writeFileSync(componentFilePath, componentCode, 'utf8');

        console.log(`✅ ${weight} ${index + 1}/${svgFiles.length} - Generado: ${componentFileName}`);
        successCount++;

      } catch (error) {
        console.error(`❌ Error procesando ${weight}/${svgFile}:`, error.message);
        errorCount++;
      }
    });

    console.log(`📋 ${weight}: ${svgFiles.length} iconos procesados\n`);
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
