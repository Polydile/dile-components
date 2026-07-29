import { cssExportGroups, getVariableMeta } from './theme-variables.js';

export function generateThemeCss(values, selector = ':root') {
  const groupBlocks = cssExportGroups.map(group => {
    const lines = group.variables.map(name => {
      const meta = getVariableMeta(name);
      const value = values[name] || meta.default;
      return `  ${name}: ${value};`;
    });
    return `  /* ${group.title} */\n${lines.join('\n')}`;
  });

  return `${selector} {\n${groupBlocks.join('\n\n')}\n}\n`;
}
