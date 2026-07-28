const STORAGE_KEY = 'theme';

function readStore() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function writeStore(store) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

// The "draft" is the working editing session (autosaved on every change),
// independent from the named palettes below.
export function readDraft() {
  return readStore().draftValues || null;
}

export function saveDraft(values) {
  const store = readStore();
  store.draftValues = values;
  writeStore(store);
}

// Named palettes: { [name]: { light, dark, darkEnabled } }
export function listPalettes() {
  const palettes = readStore().palettes || {};
  return Object.keys(palettes)
    .sort((a, b) => a.localeCompare(b))
    .map(name => ({ name, ...palettes[name] }));
}

export function getPalette(name) {
  const palettes = readStore().palettes || {};
  return palettes[name] || null;
}

export function savePalette(name, theme) {
  const store = readStore();
  store.palettes = store.palettes || {};
  store.palettes[name] = theme;
  writeStore(store);
}

export function deletePalette(name) {
  const store = readStore();
  if (store.palettes) {
    delete store.palettes[name];
    writeStore(store);
  }
}

export function renamePalette(oldName, newName) {
  if (oldName === newName) return;
  const store = readStore();
  if (!store.palettes || !(oldName in store.palettes)) return;
  store.palettes[newName] = store.palettes[oldName];
  delete store.palettes[oldName];
  if (store.activePaletteName === oldName) {
    store.activePaletteName = newName;
  }
  writeStore(store);
}

export function getActivePaletteName() {
  return readStore().activePaletteName || null;
}

export function setActivePaletteName(name) {
  const store = readStore();
  store.activePaletteName = name;
  writeStore(store);
}
