module.exports = function(content, outputPath) {
  if(outputPath && outputPath.endsWith(".html")) {
    return content.replace(/\[\[color:(#[0-9a-fA-F]{6})\]\]/g, function(match, p1) {
      return `<div style="display: inline-block; width: 32px; height: 18px; background-color: ${p1}; border: 1px solid #000;"></div>`;
    });
  }
  return content;
}