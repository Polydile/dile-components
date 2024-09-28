const EleventyVitePlugin = require("@11ty/eleventy-plugin-vite");
const { JSDOM } = require('jsdom');
const codePreviews = require('./docs/_utilities/code-previews.cjs');
const colorBox = require('./docs/_utilities/color-box-transform.cjs');
const path = require('path');
const fs = require('fs-extra');

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(EleventyVitePlugin);
  eleventyConfig.addTransform("colorBoxTransform", colorBox)
  eleventyConfig.addTransform('html-transform', function (content) {
    // Parse the template and get a Document object
    const doc = new JSDOM(content, {
      // We must set a default URL so links are parsed with a hostname. Let's use a bogus TLD so we can easily
      // identify which ones are internal and which ones are external.
      url: `https://internal/`
    }).window.document;

    codePreviews(doc);
    // Serialize the Document object to an HTML string and prepend the doctype
    content = `<!DOCTYPE html>\n${doc.documentElement.outerHTML}`;
    return content;
  });

  const componentTagsList = ["forms", "feedback", "icons", "utils", "menu", "spinner"];

  eleventyConfig.addCollection("uncategorizedComponents", function(collectionApi) {
    return collectionApi.getFilteredByTag("components")
        .filter(item => 
          !componentTagsList.some(tag => item.data.tags.includes(tag)) &&
          item.url !== '/components/' &&
          item.data.hideLink !== true
        );
  });

  // Añadir variable global con los tags
  eleventyConfig.addGlobalData("componentTagsList", componentTagsList);

  const mixinTagsList = ["formData", "effects", "scroll"];

  eleventyConfig.addCollection("uncategorizedMixins", function(collectionApi) {
    return collectionApi.getFilteredByTag("mixins")
        .filter(item => 
          !mixinTagsList.some(tag => item.data.tags.includes(tag)) &&
          item.url !== '/mixins/' &&
          item.data.hideLink !== true
        );
  });

  // Añadir variable global con los tags
  eleventyConfig.addGlobalData("mixinTagsList", mixinTagsList);

  const crudTagsList = ["configuration", "ajax", "operations", "main", "Crud extras"];

  eleventyConfig.addCollection("uncategorizedCrud", function (collectionApi) {
    return collectionApi.getFilteredByTag("crud")
      .filter(item =>
        !crudTagsList.some(tag => item.data.tags.includes(tag)) &&
        item.url !== '/crud/' &&
        item.data.hideLink !== true
      );
  });

  // Añadir variable global con los tags
  eleventyConfig.addGlobalData("crudTagsList", crudTagsList);

  eleventyConfig.on('eleventy.after', () => {
    setTimeout(() => {

      const sourceDir = path.join(__dirname, 'docs/static-images');
      const outputDir = path.join(__dirname, '_site/images');
  
      // Asegúrate de que el directorio de destino existe
      fs.ensureDirSync(outputDir);
  
      // Copiar la carpeta de imágenes manualmente después de la compilación de Vite
      fs.copySync(sourceDir, outputDir, {
        filter: (src) => {
          // Asegúrate de que solo se copien archivos desde 'docs/static-images'
          return src.startsWith(sourceDir);
        }
      });
    }, 500);
  });

  return {
    dir: {
      input: "docs",
      output: "_site",
    }
  };
};