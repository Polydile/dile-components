#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rutas de archivos
const CATALOG_FILE = path.join(__dirname, 'icon-catalog.json');
const DICTIONARY_FILE = path.join(__dirname, 'keywords-dictionary.json');
const ENRICHED_OUTPUT_FILE = path.join(__dirname, 'icon-catalog.enriched.json');

/**
 * Construye las estructuras de búsqueda a partir del diccionario:
 * - ignoreSet: tokens a descartar antes de matchear
 * - termToGroup: término -> array de términos de su grupo (tokenGroups)
 * - compoundMap: nombre completo de icono -> keywords ya resueltas (compoundGroups)
 */
function buildLookups(dictionary) {
  const ignoreSet = new Set(dictionary.ignoreTokens);

  const termToGroup = new Map();
  for (const group of dictionary.tokenGroups) {
    for (const term of group) {
      termToGroup.set(term, group);
    }
  }

  const compoundMap = new Map();
  for (const compound of dictionary.compoundGroups) {
    for (const name of compound.names) {
      compoundMap.set(name, compound.keywords);
    }
  }

  return { ignoreSet, termToGroup, compoundMap };
}

/**
 * Resuelve las keywords de un icono a partir de su 'name', aplicando
 * primero un match de nombre completo (compoundGroups) y si no hay,
 * descomponiendo el nombre en tokens y buscando cada uno en tokenGroups.
 */
function resolveKeywords(name, { ignoreSet, termToGroup, compoundMap }) {
  if (compoundMap.has(name)) {
    return [...compoundMap.get(name)].sort();
  }

  const tokens = name.split('-').filter(token => !ignoreSet.has(token));
  const tokenSet = new Set(tokens);
  const keywords = new Set();

  for (const token of tokens) {
    const group = termToGroup.get(token);
    if (!group) continue;
    for (const term of group) {
      if (!tokenSet.has(term)) keywords.add(term);
    }
  }

  return [...keywords].sort();
}

function applyDictionary() {
  console.log('🚀 Aplicando diccionario de keywords sobre el catálogo de iconos...\n');

  if (!fs.existsSync(CATALOG_FILE)) {
    console.error(`❌ Error: No se encontró ${CATALOG_FILE}. Ejecuta antes "npm run generate:icon-catalog".`);
    process.exit(1);
  }
  if (!fs.existsSync(DICTIONARY_FILE)) {
    console.error(`❌ Error: No se encontró ${DICTIONARY_FILE}`);
    process.exit(1);
  }

  const catalog = JSON.parse(fs.readFileSync(CATALOG_FILE, 'utf8'));
  const dictionary = JSON.parse(fs.readFileSync(DICTIONARY_FILE, 'utf8'));
  const lookups = buildLookups(dictionary);

  let withKeywords = 0;

  const enriched = catalog.map(icon => {
    const keywords = resolveKeywords(icon.name, lookups);
    if (keywords.length > 0) withKeywords++;
    return { ...icon, keywords };
  });

  fs.writeFileSync(ENRICHED_OUTPUT_FILE, JSON.stringify(enriched, null, 2), 'utf8');

  console.log(`📋 Total de iconos procesados: ${enriched.length}`);
  console.log(`✅ Iconos con keywords asignadas: ${withKeywords} (${(withKeywords / enriched.length * 100).toFixed(1)}%)`);
  console.log(`\n🎉 Catálogo enriquecido generado!`);
  console.log(`📁 Ubicación: ${ENRICHED_OUTPUT_FILE}`);
}

applyDictionary();
