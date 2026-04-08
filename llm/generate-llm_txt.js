
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Constantes de rutas
const LLM_TXT_OUTPUT = path.join(__dirname, '../_site/llm.txt');
const MD_OUTPUT_DIR = path.join(__dirname, '../_site/md');
const BASE_URL = 'https://dile-components.com/';
const GENERAL_INFO_PAGES = [
  'docs/how-to-use.md',
  'docs/theming.md',
  'docs/colors.md',
  'docs/contribute.md'
];
const SECTIONS = [
  { 
    key: 'components',
    title: 'Components',
    suffix: 'component',
    sourceDir: path.join(__dirname, '../docs/components')
  },
  { 
    key: 'mixins',
    title: 'Mixins',
    suffix: 'mixin',
    sourceDir: path.join(__dirname, '../docs/mixins')
  }
];
const BLOCK_SECTIONS = [
  {
    key: 'crud',
    title: 'Crud Components',
    sourceDir: path.join(__dirname, '../docs/crud'),
    blocks: [
      {
        title: 'Introduction',
        suffix: '',
        documents: ['docs/crud/general-information.md', 'docs/cli/index.md']
      },
      {
        title: 'Configuration',
        suffix: 'documentation',
        documents: ['docs/crud/axios-configuration.md', 'docs/crud/response-adapter.md', 'docs/crud/request-adapter.md', 'docs/crud/resource-config.md', 'docs/crud/actions-configuration.md']
      }
    ]
  },
  {
    key: 'lib',
    title: 'App utilities',
    sourceDir: path.join(__dirname, '../docs/lib'),
    blocks: [
      {
        title: 'Introduction',
        suffix: '',
        documents: ['docs/lib/index.md']
      },
      {
        title: 'State management',
        suffix: 'documentation',
        documents: [
          'docs/lib/redux-implementation.md', 
          'docs/lib/redux-feedback-slice.md', 
          'docs/lib/redux-user-slice.md', 
          'docs/lib/feedback-mixin.md', 
          'docs/lib/state-mixin.md', 
        ]
      },
      {
        title: 'Routing',
        suffix: 'documentation',
        documents: [
          'docs/lib/router-implementation.md', 
          'docs/lib/router-mixin.md', 
          'docs/lib/navigate-mixin.md', 
        ]
      }
    ]
  }
];

/**
 * Extrae el título del frontmatter de un archivo markdown
 */
function extractTitleFromFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);
  
  if (!match) return null;
  
  const frontmatter = match[1];
  // Buscar la línea con 'title:' y capturar todo hasta el final de la línea
  const titleMatch = frontmatter.match(/title:\s*(.+?)(?:\n|$)/);
  
  if (titleMatch) {
    // Eliminar comillas de los bordes si las hay y hacer trim
    return titleMatch[1].replace(/^["']|["']$/g, '').trim();
  }
  
  return null;
}

/**
 * Convierte enlaces internos en archivos markdown
 * Transforma /section/file/ en ../section/file.md
 * Preserva enlaces externos (http://, https://)
 */
function convertInternalLinks(content) {
  // Expresión regular para encontrar enlaces markdown [texto](ruta)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  
  return content.replace(linkRegex, (match, text, url) => {
    // Si es una URL externa, no cambiar
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return match;
    }
    
    // Si no comienza con /, no es un enlace interno relativo a root
    if (!url.startsWith('/')) {
      return match;
    }
    
    // Conversión simple: /section/file/ -> ../section/file.md
    let cleanPath = url.replace(/\/$/, '');
    
    const segments = cleanPath.split('/').filter(s => s);
    
    if (segments.length === 0) {
      return match;
    }
    
    const section = segments[0];
    const fileName = segments.slice(1).join('/') || 'index';
    
    const newUrl = `../${section}/${fileName}.md`;
    return `[${text}](${newUrl})`;
  });
}

/**
 * Crea un directorio recursivamente si no existe
 */
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Procesa una sección y retorna la estructura de datos
 */
function processSection(section) {
  const outputDir = path.join(MD_OUTPUT_DIR, section.key);
  ensureDir(outputDir);

  const files = [];

  if (!fs.existsSync(section.sourceDir)) {
    console.warn(`⚠️  Directorio no encontrado: ${section.sourceDir}`);
    return { title: section.title, suffix: section.suffix, files };
  }

  const mdFiles = fs.readdirSync(section.sourceDir)
    .filter(file => file.endsWith('.md'))
    .sort();

  mdFiles.forEach(file => {
    const sourcePath = path.join(section.sourceDir, file);
    const destPath = path.join(outputDir, file);
    
    // Copiar archivo
    let content = fs.readFileSync(sourcePath, 'utf-8');
    
    // Convertir enlaces internos
    content = convertInternalLinks(content);
    
    fs.writeFileSync(destPath, content, 'utf-8');
    
    // Extraer título del frontmatter
    const title = extractTitleFromFrontmatter(content) || file.replace('.md', '');
    
    files.push({
      title,
      markdownFile: `md/${section.key}/${file}`
    });
    
    console.log(`✓ Copiado: ${file} → ${destPath}`);
  });

  return { title: section.title, suffix: section.suffix, files };
}

/**
 * Procesa las páginas de información general
 */
function processGeneralInfoPages() {
  const files = [];

  GENERAL_INFO_PAGES.forEach(filePath => {
    const sourcePath = path.join(__dirname, '../', filePath);
    
    if (!fs.existsSync(sourcePath)) {
      console.warn(`⚠️  Archivo no encontrado: ${sourcePath}`);
      return;
    }

    const content = fs.readFileSync(sourcePath, 'utf-8');
    const fileName = path.basename(filePath);
    const destPath = path.join(MD_OUTPUT_DIR, 'general', fileName);
    
    // Crear directorio si no existe
    ensureDir(path.dirname(destPath));
    
    // Convertir enlaces internos y copiar archivo
    let processedContent = convertInternalLinks(content);
    fs.writeFileSync(destPath, processedContent, 'utf-8');
    
    // Extraer título del frontmatter
    const title = extractTitleFromFrontmatter(content) || fileName.replace('.md', '');
    
    files.push({
      title,
      markdownFile: `md/general/${fileName}`
    });
    
    console.log(`✓ Copiado: ${fileName} → ${destPath}`);
  });

  return { title: 'General Information', suffix: null, files };
}

/**
 * Procesa una sección con bloques
 */
function processBlockSection(blockSection) {
  const blocks = [];
  const processedFiles = new Set();

  blockSection.blocks.forEach(block => {
    const blockFiles = [];

    block.documents.forEach(docPath => {
      const sourcePath = path.join(__dirname, '../', docPath);
      
      if (!fs.existsSync(sourcePath)) {
        console.warn(`⚠️  Archivo no encontrado: ${sourcePath}`);
        return;
      }

      const content = fs.readFileSync(sourcePath, 'utf-8');
      
      // Extraer la ruta relativa desde 'docs/' para mantener la estructura
      const relativePathFromDocs = docPath.replace('docs/', '');
      const destPath = path.join(MD_OUTPUT_DIR, relativePathFromDocs);
      
      // Crear directorio si no existe
      ensureDir(path.dirname(destPath));
      
      // Convertir enlaces internos y copiar archivo
      let processedContent = convertInternalLinks(content);
      fs.writeFileSync(destPath, processedContent, 'utf-8');
      
      // Extraer título del frontmatter
      const fileName = path.basename(docPath);
      const title = extractTitleFromFrontmatter(content) || fileName.replace('.md', '');
      
      const mdRelativePath = `md/${relativePathFromDocs}`;
      blockFiles.push({
        title,
        markdownFile: mdRelativePath
      });

      processedFiles.add(docPath);
      console.log(`✓ Copiado: ${fileName} → ${destPath}`);
    });

    blocks.push({
      title: block.title,
      suffix: block.suffix,
      files: blockFiles
    });
  });

  return { title: blockSection.title, blocks, processedFiles };
}

/**
 * Obtiene archivos no utilizados en una sección con bloques
 */
function getUnusedFiles(blockSection, processedDocuments) {
  const unusedFiles = [];

  if (!fs.existsSync(blockSection.sourceDir)) {
    console.warn(`⚠️  Directorio no encontrado: ${blockSection.sourceDir}`);
    return unusedFiles;
  }

  const mdFiles = fs.readdirSync(blockSection.sourceDir)
    .filter(file => file.endsWith('.md'))
    .sort();

  mdFiles.forEach(file => {
    const fullPath = path.join(blockSection.sourceDir, file);
    
    // Verificar si el archivo está en los documentos procesados
    const isProcessed = Array.from(processedDocuments).some(docPath => 
      docPath.endsWith(file)
    );

    if (!isProcessed) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      
      // Mantener la estructura: docs/{key}/ → md/{key}/
      const destPath = path.join(MD_OUTPUT_DIR, blockSection.key, file);
      
      // Copiar archivo
      ensureDir(path.dirname(destPath));
      
      // Convertir enlaces internos y copiar archivo
      let processedContent = convertInternalLinks(content);
      fs.writeFileSync(destPath, processedContent, 'utf-8');
      
      // Extraer título del frontmatter
      const title = extractTitleFromFrontmatter(content) || file.replace('.md', '');
      
      unusedFiles.push({
        title,
        markdownFile: `md/${blockSection.key}/${file}`
      });

      console.log(`✓ Copiado (no utilizado): ${file} → ${destPath}`);
    }
  });

  return unusedFiles;
}

/**
 * Genera el contenido del llm.txt
 */
function generateLlmTxt(structure) {
  let content = '# Dile Components - Web Components Library\n\nCustom elements, mixins, and helpful Web apps utilities for any project or framework.\n\n';
  
  structure.forEach(section => {
    content += `## ${section.title}\n\n`;
    
    // Si tiene bloques (sección especial)
    if (section.blocks) {
      section.blocks.forEach(block => {
        if (block.title) {
          content += `### ${block.title}\n\n`;
        }

        block.files.forEach(file => {
          if (block.suffix) {
            const linkText = `${file.title} ${block.suffix}`;
            const url = `${BASE_URL}${file.markdownFile}`;
            content += `- [${linkText}](${url})\n`;
          } else {
            const url = `${BASE_URL}${file.markdownFile}`;
            content += `- [${file.title}](${url})\n`;
          }
        });
        
        content += '\n';
      });

      // Agregar archivos no utilizados como componentes si existen
      if (section.unusedFiles && section.unusedFiles.length > 0) {
        content += `### Components\n\n`;
        section.unusedFiles.forEach(file => {
          const linkText = `${file.title} component`;
          const url = `${BASE_URL}${file.markdownFile}`;
          content += `- [${linkText}](${url})\n`;
        });
        content += '\n';
      }
    } 
    // Si es una sección simple con archivos
    else if (section.files) {
      section.files.forEach(file => {
        if (section.suffix) {
          const linkText = `${file.title} ${section.suffix}`;
          const url = `${BASE_URL}${file.markdownFile}`;
          content += `- [${linkText}](${url})\n`;
        } else {
          const url = `${BASE_URL}${file.markdownFile}`;
          content += `- [${file.title}](${url})\n`;
        }
      });
      
      content += '\n';
    }
  });

  return content;
}

/**
 * Función principal
 */
async function main() {
  console.log('🚀 Iniciando generación de documentación LLM...\n');

  // Procesar páginas de información general primero
  const generalInfo = processGeneralInfoPages();
  
  // Procesar cada sección simple
  const sections = SECTIONS.map(section => processSection(section));

  // Procesar block sections
  const blockSections = BLOCK_SECTIONS.map(blockSection => {
    const blockData = processBlockSection(blockSection);
    const unusedFiles = getUnusedFiles(blockSection, blockData.processedFiles);
    return {
      title: blockData.title,
      blocks: blockData.blocks,
      unusedFiles
    };
  });

  // Construir la estructura completa (general info, secciones simples, luego block sections)
  const structure = [generalInfo, ...sections, ...blockSections];

  // Asegurar que el directorio de salida existe
  const outputDir = path.dirname(LLM_TXT_OUTPUT);
  ensureDir(outputDir);

  // Generar llm.txt
  const llmContent = generateLlmTxt(structure);
  fs.writeFileSync(LLM_TXT_OUTPUT, llmContent, 'utf-8');

  console.log('\n✅ Generación completada:');
  console.log(`📄 Archivo LLM generado: ${LLM_TXT_OUTPUT}`);
  console.log(`📁 Markdown copiados en: ${MD_OUTPUT_DIR}`);

  // Mostrar estructura generada (para debug)
  console.log('\n📊 Estructura generada:');
  console.log(JSON.stringify(structure, null, 2));
}

main().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});