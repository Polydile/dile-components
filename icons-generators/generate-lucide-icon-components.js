#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rutas de directorios
const LUCIDE_ICONS_DIR = path.join(__dirname, '..', 'src-icons/lucide-icons');
const COMPONENTS_OUTPUT_DIR = path.join(__dirname, '..', 'packages', 'iconlib', 'lucide-icons');

/**
 * Convierte el nombre de archivo SVG a nombre de clase de componente
 * Ejemplo: "a-arrow-down.svg" -> "LluaiIconAArrowDown"
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
 * Ejemplo: "a-arrow-down.svg" -> "lluai-icon-a-arrow-down"
 */
function svgFileNameToCustomElementName(fileName) {
  const nameWithoutExtension = fileName.replace('.svg', '');
  return `dile-lucide-icon-${nameWithoutExtension}`;
}

/**
 * Lee el contenido SVG y lo limpia para usar en el componente
 */
function processSvgContent(svgFilePath) {
  const svgContent = fs.readFileSync(svgFilePath, 'utf8');
  
  // Remover saltos de línea y espacios extra para tener una línea limpia
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
 * Función principal que genera todos los componentes
 */
function generateComponents() {
  console.log('🚀 Iniciando generación de componentes de iconos...\n');
  
  // Verificar que existe el directorio de iconos de Lucide
  if (!fs.existsSync(LUCIDE_ICONS_DIR)) {
    console.error(`❌ Error: No se encontró el directorio ${LUCIDE_ICONS_DIR}`);
    process.exit(1);
  }
  
  // Crear directorio de salida si no existe
  if (!fs.existsSync(COMPONENTS_OUTPUT_DIR)) {
    fs.mkdirSync(COMPONENTS_OUTPUT_DIR, { recursive: true });
    console.log(`📁 Creado directorio: ${COMPONENTS_OUTPUT_DIR}`);
  }
  
  // Leer todos los archivos SVG
  const files = fs.readdirSync(LUCIDE_ICONS_DIR);
  const svgFiles = files.filter(file => file.endsWith('.svg'));
  
  console.log(`📋 Encontrados ${svgFiles.length} archivos SVG\n`);
  
  let successCount = 0;
  let errorCount = 0;
  
  svgFiles.forEach((svgFile, index) => {
    try {
      const svgFilePath = path.join(LUCIDE_ICONS_DIR, svgFile);
      const className = svgFileNameToClassName(svgFile);
      const customElementName = svgFileNameToCustomElementName(svgFile);
      const svgContent = processSvgContent(svgFilePath);
      
      const componentCode = generateComponentCode(className, customElementName, svgContent);
      
      // Generar nombre de archivo para el componente (mismo nombre que el SVG pero con .js)
      const componentFileName = svgFile.replace('.svg', '.js');
      const componentFilePath = path.join(COMPONENTS_OUTPUT_DIR, componentFileName);
      
      // Escribir el archivo del componente
      fs.writeFileSync(componentFilePath, componentCode, 'utf8');
      
      console.log(`✅ ${index + 1}/${svgFiles.length} - Generado: ${componentFileName}`);
      successCount++;
      
    } catch (error) {
      console.error(`❌ Error procesando ${svgFile}:`, error.message);
      errorCount++;
    }
  });
  
  console.log(`\n🎉 Generación completada!`);
  console.log(`✅ Componentes generados exitosamente: ${successCount}`);
  if (errorCount > 0) {
    console.log(`❌ Errores: ${errorCount}`);
  }
  console.log(`📁 Ubicación: ${COMPONENTS_OUTPUT_DIR}`);
}

// Ejecutar el script
generateComponents();