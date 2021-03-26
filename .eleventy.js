const Image = require('@11ty/eleventy-img');
const { RemoteAssetCache } = require('@11ty/eleventy-cache-assets');
const sizeOf = require('image-size');

function imageShortcode(src, attributes = {}, maxWidth = 2636) {
  console.log('src', src);
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

  const widths = [295, 590, 1180, 1770, 2360];

  const originalFormat = src.split('.').pop();

  const options = {
    widths: [...widths.filter((v) => maxWidth - v >= 200), maxWidth],
    formats: ['avif', 'webp', originalFormat],
    urlPath: '/images/',
    outputDir: './dist/images/',
    sharpPngOptions: {
      compressionLevel: 9,
      quality: 60,
    },
  };

  Image(src, options);

  const metadata = Image.statsSync(src, options);

  const firstMetadataObj = metadata[Object.keys(metadata)[0]];
  const maxWidthReal = firstMetadataObj.reduce((acc, curr) => {
    if (curr.width > acc) {
      return curr.width;
    }
    return acc;
  }, 0);

  const imageAttributes = {
    sizes: `(max-width: ${maxWidthReal}px) 100vw, ${maxWidthReal}px`,
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

  config.addNunjucksShortcode('image', imageShortcode);

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
