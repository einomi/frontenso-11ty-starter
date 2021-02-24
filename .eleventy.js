module.exports = (config) => {
  config.addPassthroughCopy({ 'src/public': '/' });

  config.setBrowserSyncConfig({
    files: ['dist/**/*'],
    open: false,
  });

  return {
    dir: {
      input: 'src',
      output: 'dist',
      includes: 'components',
      layouts: '_layouts',
    },
    templateFormats: ['md', 'njk'],
    htmlTemplateEngine: 'njk',
  };
};
