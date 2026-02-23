const { JSDOM } = require('jsdom');
const codePreviews = require('./docs/_utilities/code-previews.cjs');
const colorBox = require('./docs/_utilities/color-box-transform.cjs');
const path = require('path');
const fs = require('fs-extra');

module.exports = async function(eleventyConfig) {
  const EleventyPluginVite = (await import("@11ty/eleventy-plugin-vite")).default;
  eleventyConfig.addPlugin(EleventyPluginVite);
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

  // Añadir variable global con los crud tags
  eleventyConfig.addGlobalData("crudTagsList", crudTagsList);

const libTagList = ["state management", "routing", "app components"];
eleventyConfig.addGlobalData("libTagList", libTagList)


  eleventyConfig.on('eleventy.after', () => {
    setTimeout(() => {

      const sourceDir = path.join(__dirname, 'docs/static-images');
      const outputDir = path.join(__dirname, '_site/images');
  
      fs.ensureDirSync(outputDir);
  
      fs.copySync(sourceDir, outputDir, {
        filter: (src) => {
          return src.startsWith(sourceDir);
        }
      });
    }, 500);
  });

  eleventyConfig.addPassthroughCopy('docs/assets/js')
  eleventyConfig.addPassthroughCopy('docs/assets/css')

  return {
    dir: {
      input: "docs",
      output: "_site",
    }
  };
};