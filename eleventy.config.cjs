const { JSDOM } = require('jsdom');
const codePreviews = require('./docs/_utilities/code-previews.cjs');
const colorBox = require('./docs/_utilities/color-box-transform.cjs');
const path = require('path');
const fs = require('fs-extra');
const markdownIt = require('markdown-it');
const markdownItAttrs = require('markdown-it-attrs');

module.exports = async function(eleventyConfig) {
  const md = markdownIt({ html: true }).use(markdownItAttrs);
  eleventyConfig.setLibrary('md', md);

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

  const componentTagsList = [
    { key: "forms", label: "Forms", icon: "lucide.form" },
    { key: "feedback", label: "Feedback", icon: "material.feedback" },
    { key: "icons", label: "Icons", icon: "tabler.icons" },
    { key: "utils", label: "Utils", icon: "phosphor.app-window" },
    { key: "menu", label: "Menu", icon: "remixicon.menu-fill" },
    { key: "spinner", label: "Spinner", icon: "phosphor.spinner" },
    { key: "layout", label: "Layout", icon: "phosphor.layout" },
  ];

  eleventyConfig.addCollection("uncategorizedComponents", function(collectionApi) {
    return collectionApi.getFilteredByTag("components")
        .filter(item => 
          !componentTagsList.some(tag => item.data.tags.includes(tag.key)) &&
          !item.data.tags.includes("input") &&
          item.url !== '/components/' &&
          item.data.hideLink !== true &&
          item.data.status !== 'deprecated'
        );
  });

  eleventyConfig.addGlobalData("componentTagsList", componentTagsList);

  // Crear colecciones filtradas para cada tag de componentes
  componentTagsList.forEach(tag => {
    eleventyConfig.addCollection(tag.key, function(collectionApi) {
      return collectionApi.getFilteredByTag(tag.key)
          .filter(item => item.data.status !== 'deprecated');
    });
  });

  // Crear colección para componentes con input tag
  eleventyConfig.addCollection("input", function(collectionApi) {
    return collectionApi.getFilteredByTag("input")
        .filter(item => item.data.status !== 'deprecated');
  });

  const mixinTagsList = ["formData", "effects", "scroll"];

  eleventyConfig.addCollection("uncategorizedMixins", function(collectionApi) {
    return collectionApi.getFilteredByTag("mixins")
        .filter(item => 
          !mixinTagsList.some(tag => item.data.tags.includes(tag)) &&
          item.url !== '/mixins/' &&
          item.data.hideLink !== true &&
          item.data.status !== 'deprecated'
        );
  });

  eleventyConfig.addGlobalData("mixinTagsList", mixinTagsList);

  // Crear colecciones filtradas para cada tag de mixins
  mixinTagsList.forEach(tag => {
    eleventyConfig.addCollection(tag, function(collectionApi) {
      return collectionApi.getFilteredByTag(tag)
          .filter(item => item.data.status !== 'deprecated');
    });
  });

  const crudTagsList = ["introduction", "configuration", "ajax", "operations", "main", "Crud extras"];

  eleventyConfig.addCollection("uncategorizedCrud", function (collectionApi) {
    return collectionApi.getFilteredByTag("crud")
      .filter(item =>
        !crudTagsList.some(tag => item.data.tags.includes(tag)) &&
        item.url !== '/crud/' &&
        item.data.hideLink !== true &&
        item.data.status !== 'deprecated'
      );
  });

  // Añadir variable global con los crud tags
  eleventyConfig.addGlobalData("crudTagsList", crudTagsList);

  // Crear colecciones filtradas para cada tag de CRUD
  crudTagsList.forEach(tag => {
    eleventyConfig.addCollection(tag, function(collectionApi) {
      return collectionApi.getFilteredByTag(tag)
          .filter(item => item.data.status !== 'deprecated');
    });
  });

  const iconsTagsList = ["lucide", "fontawesome", "material", "phosphor", "tabler", "remixicon", "universal icons"];

  eleventyConfig.addGlobalData("iconsTagsList", iconsTagsList);

  // Crear colecciones filtradas para cada tag de icons
  iconsTagsList.forEach(tag => {
    eleventyConfig.addCollection(tag, function(collectionApi) {
      return collectionApi.getFilteredByTag(tag)
          .filter(item => item.data.status !== 'deprecated');
    });
  });

const libTagList = ["state management", "routing", "app components"];
eleventyConfig.addGlobalData("libTagList", libTagList);

// Crear colecciones filtradas para cada tag de lib
libTagList.forEach(tag => {
  eleventyConfig.addCollection(tag, function(collectionApi) {
    return collectionApi.getFilteredByTag(tag)
        .filter(item => item.data.status !== 'deprecated');
  });
});


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