// Mirrors the :root and :root.dark-theme blocks in docs/assets/css/colors.css.
// `default` is the light theme value, `darkDefault` is the dark theme value.
// --dile-alert-warning-color has no override in :root.dark-theme (it just
// inherits the light value on the real site), so darkDefault matches default.
import { mixColor } from './color-utils.js';

const mainVariables = [
  { name: '--dile-background-color', label: 'Background', default: '#ffffff', darkDefault: '#303030' },
  { name: '--dile-on-background-color', label: 'On background', default: '#303030', darkDefault: '#ffffff' },
  { name: '--dile-primary-color', label: 'Primary', default: '#f3f3ae', darkDefault: '#205d5c' },
  { name: '--dile-on-primary-color', label: 'On primary', default: '#303030', darkDefault: '#ffffff' },
  { name: '--dile-secondary-color', label: 'Secondary', default: '#27a744', darkDefault: '#5f9cd8' },
  { name: '--dile-on-secondary-color', label: 'On secondary', default: '#ffffff', darkDefault: '#1e1e1e' },
  { name: '--dile-terciary-color', label: 'Terciary', default: '#2789a7', darkDefault: '#9650e0' },
  { name: '--dile-on-terciary-color', label: 'On terciary', default: '#ffffff', darkDefault: '#1e1e1e' },
  { name: '--dile-neutral-color', label: 'Neutral', default: '#c2c2c2', darkDefault: '#2c2c2c' },
  { name: '--dile-on-neutral-color', label: 'On neutral', default: '#303030', darkDefault: '#ffffff' },
  { name: '--dile-alert-error-color', label: 'Alert error', default: '#cf3535', darkDefault: '#ff6a6a' },
  { name: '--dile-alert-success-color', label: 'Alert success', default: '#00900f', darkDefault: '#33cc55' },
  { name: '--dile-alert-warning-color', label: 'Alert warning', default: '#bf8a2e', darkDefault: '#d7b740' },
  { name: '--dile-alert-neutral-color', label: 'Alert neutral', default: '#2889a7', darkDefault: '#58c0da' },
  { name: '--dile-on-alert-color', label: 'On alert', default: '#ffffff', darkDefault: '#1e1e1e' },
  { name: '--dile-danger-color', label: 'Danger', default: '#e34a1b', darkDefault: '#ff4b47' },
  { name: '--dile-on-danger-color', label: 'On danger', default: '#ffffff', darkDefault: '#ffffff' },
  { name: '--dile-link-color', label: 'Link', default: '#3399ff', darkDefault: '#3399ff' },
  { name: '--dile-gray-very-light-color', label: 'Gray very light', default: '#f5f5f5', darkDefault: '#404040' },
  { name: '--dile-on-gray-very-light-color', label: 'On gray very light', default: '#303030', darkDefault: '#ffffff' },
];

function findMainVariable(name) {
  return mainVariables.find(variable => variable.name === name);
}

// How far the auto-calculated "lighter"/"darker" variations reach, on top of
// the existing hand-picked "light"/"dark" values (0 = base color, 1 = white/black).
const LIGHTER_MIX = 0.9;
const DARKER_MIX = 0.6;

// Base color each auto-calculated variation is derived from, used both to seed
// default values below and by calculateVariations() for the "Calculate
// automatically" button.
export const variationRecipes = [
  {
    base: '--dile-primary-color',
    light: '--dile-primary-light-color',
    lighter: '--dile-primary-lighter-color',
    dark: '--dile-primary-dark-color',
    darker: '--dile-primary-darker-color',
  },
  {
    base: '--dile-secondary-color',
    light: '--dile-secondary-light-color',
    lighter: '--dile-secondary-lighter-color',
    dark: '--dile-secondary-dark-color',
    darker: '--dile-secondary-darker-color',
  },
  {
    base: '--dile-terciary-color',
    light: '--dile-terciary-light-color',
    lighter: '--dile-terciary-lighter-color',
    dark: '--dile-terciary-dark-color',
    darker: '--dile-terciary-darker-color',
  },
];

// "light"/"dark" describe a role (closer to / further from the background),
// not a literal shade. In light mode the background is light, so "light"
// mixes towards white to sit closer to it; in dark mode the background is
// dark, so "light" must mix towards black instead to keep that same role.
// "dark" always mixes the opposite way, for contrast against the background.
function lightMixTarget(mode) {
  return mode === 'dark' ? '#000000' : '#ffffff';
}

function darkMixTarget(mode) {
  return mode === 'dark' ? '#ffffff' : '#000000';
}

// Computes light/lighter/dark/darker variations from the current base colors.
// Used by the theme builder's "Calculate automatically" button; it only
// touches the variation background colors, never the on-* text colors, so
// manually chosen text colors are preserved.
export function calculateVariations(values, mode = 'light') {
  const lightTarget = lightMixTarget(mode);
  const darkTarget = darkMixTarget(mode);
  const updates = {};
  variationRecipes.forEach(recipe => {
    const base = values[recipe.base];
    if (!base) return;
    updates[recipe.light] = mixColor(base, lightTarget, LIGHTER_MIX / 2);
    updates[recipe.lighter] = mixColor(base, lightTarget, LIGHTER_MIX);
    updates[recipe.dark] = mixColor(base, darkTarget, DARKER_MIX / 2);
    updates[recipe.darker] = mixColor(base, darkTarget, DARKER_MIX);
  });
  return updates;
}

const primaryBase = findMainVariable('--dile-primary-color');
const secondaryBase = findMainVariable('--dile-secondary-color');
const terciaryBase = findMainVariable('--dile-terciary-color');

const variationVariables = [
  { name: '--dile-primary-light-color', label: 'Primary light', default: '#fafadf', darkDefault: '#9f9f68' },
  {
    name: '--dile-primary-lighter-color',
    label: 'Primary lighter',
    default: mixColor(primaryBase.default, lightMixTarget('light'), LIGHTER_MIX),
    darkDefault: mixColor(primaryBase.darkDefault, lightMixTarget('dark'), LIGHTER_MIX),
  },
  { name: '--dile-on-primary-light-color', label: 'On primary light', default: '#303030', darkDefault: '#000000' },
  { name: '--dile-primary-dark-color', label: 'Primary dark', default: '#d7d353', darkDefault: '#204036' },
  {
    name: '--dile-primary-darker-color',
    label: 'Primary darker',
    default: mixColor(primaryBase.default, darkMixTarget('light'), DARKER_MIX),
    darkDefault: mixColor(primaryBase.darkDefault, darkMixTarget('dark'), DARKER_MIX),
  },
  { name: '--dile-on-primary-dark-color', label: 'On primary dark', default: '#303030', darkDefault: '#ffffff' },
  { name: '--dile-secondary-light-color', label: 'Secondary light', default: '#beed8e', darkDefault: '#9fecf2' },
  {
    name: '--dile-secondary-lighter-color',
    label: 'Secondary lighter',
    default: mixColor(secondaryBase.default, lightMixTarget('light'), LIGHTER_MIX),
    darkDefault: mixColor(secondaryBase.darkDefault, lightMixTarget('dark'), LIGHTER_MIX),
  },
  { name: '--dile-on-secondary-light-color', label: 'On secondary light', default: '#303030', darkDefault: '#1e1e1e' },
  { name: '--dile-secondary-dark-color', label: 'Secondary dark', default: '#43842e', darkDefault: '#134f62' },
  {
    name: '--dile-secondary-darker-color',
    label: 'Secondary darker',
    default: mixColor(secondaryBase.default, darkMixTarget('light'), DARKER_MIX),
    darkDefault: mixColor(secondaryBase.darkDefault, darkMixTarget('dark'), DARKER_MIX),
  },
  { name: '--dile-on-secondary-dark-color', label: 'On secondary dark', default: '#ffffff', darkDefault: '#ffffff' },
  { name: '--dile-terciary-light-color', label: 'Terciary light', default: '#85d4f0', darkDefault: '#d5a5f8' },
  {
    name: '--dile-terciary-lighter-color',
    label: 'Terciary lighter',
    default: mixColor(terciaryBase.default, lightMixTarget('light'), LIGHTER_MIX),
    darkDefault: mixColor(terciaryBase.darkDefault, lightMixTarget('dark'), LIGHTER_MIX),
  },
  { name: '--dile-on-terciary-light-color', label: 'On terciary light', default: '#303030', darkDefault: '#1e1e1e' },
  { name: '--dile-terciary-dark-color', label: 'Terciary dark', default: '#125462', darkDefault: '#310e49' },
  {
    name: '--dile-terciary-darker-color',
    label: 'Terciary darker',
    default: mixColor(terciaryBase.default, darkMixTarget('light'), DARKER_MIX),
    darkDefault: mixColor(terciaryBase.darkDefault, darkMixTarget('dark'), DARKER_MIX),
  },
  { name: '--dile-on-terciary-dark-color', label: 'On terciary dark', default: '#ffffff', darkDefault: '#ffffff' },
  { name: '--dile-gray-dark-color', label: 'Gray dark', default: '#555555', darkDefault: '#cccccc' },
  { name: '--dile-on-gray-dark-color', label: 'On gray dark', default: '#ffffff', darkDefault: '#1e1e1e' },
];

export const variableGroups = [
  { id: 'main', title: 'Main colors', variables: mainVariables },
  { id: 'variations', title: 'Color variations', variables: variationVariables },
];

// Groups the "Main colors" editor fields into visually related blocks.
// The alert-* colors all share the single --dile-on-alert-color text color.
export const mainColorBlocks = [
  { label: 'Background', variables: ['--dile-background-color', '--dile-on-background-color', '--dile-link-color'] },
  { label: 'Primary', variables: ['--dile-primary-color', '--dile-on-primary-color'] },
  { label: 'Secondary', variables: ['--dile-secondary-color', '--dile-on-secondary-color'] },
  { label: 'Terciary', variables: ['--dile-terciary-color', '--dile-on-terciary-color'] },
  { label: 'Neutral', variables: ['--dile-neutral-color', '--dile-on-neutral-color'] },
  {
    label: 'Alert',
    variables: [
      '--dile-alert-error-color',
      '--dile-alert-success-color',
      '--dile-alert-warning-color',
      '--dile-alert-neutral-color',
      '--dile-on-alert-color',
    ],
  },
  { label: 'Danger', variables: ['--dile-danger-color', '--dile-on-danger-color'] },
  { label: 'Gray very light', variables: ['--dile-gray-very-light-color', '--dile-on-gray-very-light-color'] },
];

// Groups the "Color variations" editor fields into visually related blocks.
// "lighter"/"darker" have no dedicated on-* color of their own: they're
// grouped with (and use the text color of) their "light"/"dark" sibling.
export const variationColorBlocks = [
  { label: 'Primary light', variables: ['--dile-primary-light-color', '--dile-primary-lighter-color', '--dile-on-primary-light-color'] },
  { label: 'Primary dark', variables: ['--dile-primary-dark-color', '--dile-primary-darker-color', '--dile-on-primary-dark-color'] },
  { label: 'Secondary light', variables: ['--dile-secondary-light-color', '--dile-secondary-lighter-color', '--dile-on-secondary-light-color'] },
  { label: 'Secondary dark', variables: ['--dile-secondary-dark-color', '--dile-secondary-darker-color', '--dile-on-secondary-dark-color'] },
  { label: 'Terciary light', variables: ['--dile-terciary-light-color', '--dile-terciary-lighter-color', '--dile-on-terciary-light-color'] },
  { label: 'Terciary dark', variables: ['--dile-terciary-dark-color', '--dile-terciary-darker-color', '--dile-on-terciary-dark-color'] },
  { label: 'Gray dark', variables: ['--dile-gray-dark-color', '--dile-on-gray-dark-color'] },
];

// Order used when generating the downloadable theme.css file. This is
// independent from variableGroups (which drives the editor's field layout):
// here each color and all its light/dark variations are kept together.
export const cssExportGroups = [
  {
    title: 'Background',
    variables: ['--dile-background-color', '--dile-on-background-color', '--dile-link-color'],
  },
  {
    title: 'Primary',
    variables: [
      '--dile-primary-color',
      '--dile-on-primary-color',
      '--dile-primary-light-color',
      '--dile-primary-lighter-color',
      '--dile-on-primary-light-color',
      '--dile-primary-dark-color',
      '--dile-primary-darker-color',
      '--dile-on-primary-dark-color',
    ],
  },
  {
    title: 'Secondary',
    variables: [
      '--dile-secondary-color',
      '--dile-on-secondary-color',
      '--dile-secondary-light-color',
      '--dile-secondary-lighter-color',
      '--dile-on-secondary-light-color',
      '--dile-secondary-dark-color',
      '--dile-secondary-darker-color',
      '--dile-on-secondary-dark-color',
    ],
  },
  {
    title: 'Terciary',
    variables: [
      '--dile-terciary-color',
      '--dile-on-terciary-color',
      '--dile-terciary-light-color',
      '--dile-terciary-lighter-color',
      '--dile-on-terciary-light-color',
      '--dile-terciary-dark-color',
      '--dile-terciary-darker-color',
      '--dile-on-terciary-dark-color',
    ],
  },
  {
    title: 'Neutral and grays',
    variables: [
      '--dile-neutral-color',
      '--dile-on-neutral-color',
      '--dile-gray-very-light-color',
      '--dile-on-gray-very-light-color',
      '--dile-gray-dark-color',
      '--dile-on-gray-dark-color',
    ],
  },
  {
    title: 'Alerts',
    variables: [
      '--dile-alert-error-color',
      '--dile-alert-success-color',
      '--dile-alert-warning-color',
      '--dile-alert-neutral-color',
      '--dile-on-alert-color',
      '--dile-danger-color',
      '--dile-on-danger-color',
    ],
  },
];

export function getVariableMeta(name) {
  for (const group of variableGroups) {
    const found = group.variables.find(variable => variable.name === name);
    if (found) return found;
  }
  return null;
}

// Background/text pairs used to render the swatch preview blocks.
// Several bases (the alert-* colors) share the same "on" text color.
export const previewPairs = [
  { group: 'main', bg: '--dile-background-color', text: '--dile-on-background-color', label: 'Background' },
  { group: 'main', bg: '--dile-primary-color', text: '--dile-on-primary-color', label: 'Primary' },
  { group: 'main', bg: '--dile-secondary-color', text: '--dile-on-secondary-color', label: 'Secondary' },
  { group: 'main', bg: '--dile-terciary-color', text: '--dile-on-terciary-color', label: 'Terciary' },
  { group: 'main', bg: '--dile-neutral-color', text: '--dile-on-neutral-color', label: 'Neutral' },
  { group: 'main', bg: '--dile-alert-error-color', text: '--dile-on-alert-color', label: 'Alert error' },
  { group: 'main', bg: '--dile-alert-success-color', text: '--dile-on-alert-color', label: 'Alert success' },
  { group: 'main', bg: '--dile-alert-warning-color', text: '--dile-on-alert-color', label: 'Alert warning' },
  { group: 'main', bg: '--dile-alert-neutral-color', text: '--dile-on-alert-color', label: 'Alert neutral' },
  { group: 'main', bg: '--dile-danger-color', text: '--dile-on-danger-color', label: 'Danger' },
  { group: 'main', bg: '--dile-gray-very-light-color', text: '--dile-on-gray-very-light-color', label: 'Gray very light' },
  { group: 'variations', bg: '--dile-primary-light-color', text: '--dile-on-primary-light-color', label: 'Primary light' },
  { group: 'variations', bg: '--dile-primary-lighter-color', text: '--dile-on-primary-light-color', label: 'Primary lighter' },
  { group: 'variations', bg: '--dile-primary-dark-color', text: '--dile-on-primary-dark-color', label: 'Primary dark' },
  { group: 'variations', bg: '--dile-primary-darker-color', text: '--dile-on-primary-dark-color', label: 'Primary darker' },
  { group: 'variations', bg: '--dile-secondary-light-color', text: '--dile-on-secondary-light-color', label: 'Secondary light' },
  { group: 'variations', bg: '--dile-secondary-lighter-color', text: '--dile-on-secondary-light-color', label: 'Secondary lighter' },
  { group: 'variations', bg: '--dile-secondary-dark-color', text: '--dile-on-secondary-dark-color', label: 'Secondary dark' },
  { group: 'variations', bg: '--dile-secondary-darker-color', text: '--dile-on-secondary-dark-color', label: 'Secondary darker' },
  { group: 'variations', bg: '--dile-terciary-light-color', text: '--dile-on-terciary-light-color', label: 'Terciary light' },
  { group: 'variations', bg: '--dile-terciary-lighter-color', text: '--dile-on-terciary-light-color', label: 'Terciary lighter' },
  { group: 'variations', bg: '--dile-terciary-dark-color', text: '--dile-on-terciary-dark-color', label: 'Terciary dark' },
  { group: 'variations', bg: '--dile-terciary-darker-color', text: '--dile-on-terciary-dark-color', label: 'Terciary darker' },
  { group: 'variations', bg: '--dile-gray-dark-color', text: '--dile-on-gray-dark-color', label: 'Gray dark' },
];

export function getDefaultValues(mode = 'light') {
  const values = {};
  variableGroups.forEach(group => {
    group.variables.forEach(variable => {
      values[variable.name] = mode === 'dark' ? variable.darkDefault : variable.default;
    });
  });
  return values;
}
