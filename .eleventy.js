const Image = require('@11ty/eleventy-img');
const { RemoteAssetCache } = require('@11ty/eleventy-cache-assets');
const sizeOf = require('image-size');

async function imageShortcode(src, attributes = {}, maxWidth = 1440) {
  console.log('maxWidth', maxWidth);
  if (typeof src != 'string') {
    throw new Error(`The path for the image is incorrect: ${src}`);
  }
  if (typeof maxWidth != 'number') {
    throw new Error(
      `\`maxWidth\` param should be of type number, received: ${maxWidth}`
    );
  }
  if (typeof attributes != 'object') {
    throw new Error('Image attributes should be of type `object`');
  }

  const options = {
    widths: [...[300, 600, 1000].filter((v) => maxWidth - v >= 200), maxWidth],
    formats: ['avif', 'webp', 'jpeg'],
    urlPath: '/assets/images/',
    outputDir: './dist/assets/images/',
  };

  const metadata = await Image(src, options);

  let imageAttributes = {
    sizes: `(max-width: ${maxWidth}px) 100vw, ${maxWidth}px`,
    alt: '',
    loading: 'lazy',
    decoding: 'async',
    ...attributes,
  };

  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = (config) => {
  config.addPassthroughCopy({ 'src/public': '/' });

  config.setBrowserSyncConfig({
    files: ['dist/**/*'],
    open: false,
  });

  config.addNunjucksAsyncShortcode('image', imageShortcode);

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
