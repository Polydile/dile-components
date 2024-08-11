const EleventyVitePlugin = require("@11ty/eleventy-plugin-vite");
const { JSDOM } = require('jsdom');
const codePreviews = require('./docs/_utilities/code-previews.cjs');
const colorBox = require('./docs/_utilities/color-box-transform.cjs');

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

  const crudTagsList = ["configuration", "ajax", "operations", "main"];

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

  return {
    dir: {
      input: "docs",
      output: "_site",
    }
  };
};