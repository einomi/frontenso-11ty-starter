const Image = require('@11ty/eleventy-img');
const Assets = require('assets');
const path = require('path');

const generateImageHTML = require('./generate-image-html');
const fs = require('fs');

function imageShortcode(src, attributes = {}, maxWidth = 2636) {
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
    sharpAvifOptions: {
      quality: 55,
      effort: 5,
      chromaSubsampling: '4:2:0',
    },
    sharpWebpOptions: {
      quality: 65,
      alphaQuality: 77,
      chromaSubsampling: '4:2:0',
    },
    sharpJpegOptions: {
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

  return generateImageHTML(metadata, imageAttributes);
}

function inlineSvgSprite() {
  try {
    return fs.readFileSync('./dist/svg/sprite.svg', 'utf8');
  } catch (error) {
    console.warn("SVG Sprite file doesn't exist");
  }
  return '';
}

const base64Resolver = new Assets();
function inline(imgPath, callback) {
  const pathResolved = path.resolve(imgPath);

  base64Resolver.data(pathResolved, callback);
}

module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy({ 'src/public': '/' });

  eleventyConfig.setBrowserSyncConfig({
    files: [
      'dist/css/*.css',
      'dist/*.html',
      'dist/images/*.avif',
      'dist/js/*.js',
    ],
    open: false,
  });

  eleventyConfig.addNunjucksShortcode('image', imageShortcode);
  eleventyConfig.addNunjucksShortcode('svg_sprite', inlineSvgSprite);
  eleventyConfig.addNunjucksAsyncFilter('inline', inline);

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
