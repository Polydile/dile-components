// Carpetas de @dile/iconlib que contienen componentes de icono, y su librería asociada
export const LIBRARY_FOLDERS = [
  { folder: 'lucide-icons', library: 'lucide' },
  { folder: 'material-icons', library: 'material' },
  { folder: 'fontawesome-icons', library: 'fontawesome' },
  { folder: 'phosphor-icons', library: 'phosphor' },
  { folder: 'tabler-icons', library: 'tabler' },
  { folder: 'remixicon-icons', library: 'remixicon' }
];

export const ALL_LIBRARIES = LIBRARY_FOLDERS.map(({ library }) => library);

/**
 * Resuelve el filtro de biblioteca(s) a procesar, desde --library=a,b (CLI)
 * o la variable de entorno ICON_LIBRARY (para encadenar scripts vía npm run).
 * Devuelve null si no hay filtro (= todas las bibliotecas).
 */
export function getLibraryFilter() {
  const cliArg = process.argv.find(arg => arg.startsWith('--library='));
  const raw = cliArg ? cliArg.slice('--library='.length) : process.env.ICON_LIBRARY;

  if (!raw) return null;

  const libraries = [...new Set(raw.split(',').map(s => s.trim()).filter(Boolean))];
  const invalid = libraries.filter(l => !ALL_LIBRARIES.includes(l));

  if (invalid.length > 0) {
    console.error(`❌ Error: biblioteca(s) desconocida(s): ${invalid.join(', ')}. Válidas: ${ALL_LIBRARIES.join(', ')}`);
    process.exit(1);
  }

  return libraries;
}
