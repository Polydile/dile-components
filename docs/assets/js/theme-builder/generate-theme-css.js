import { variableGroups } from './theme-variables.js';

export function generateThemeCss(values, selector = ':root') {
  const groupBlocks = variableGroups.map(group => {
    const lines = group.variables.map(variable => {
      const value = values[variable.name] || variable.default;
      return `  ${variable.name}: ${value};`;
    });
    return `  /* ${group.title} */\n${lines.join('\n')}`;
  });

  return `${selector} {\n${groupBlocks.join('\n\n')}\n}\n`;
}
