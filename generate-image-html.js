const omit = require('lodash').omit;

const DEFAULT_ATTRIBUTES = {
  // loading: "lazy",
  // decoding: "async",
};

const LOWSRC_FORMAT_PREFERENCE = ['jpeg', 'png', 'svg', 'webp', 'avif'];

/*
  Returns:
  e.g. { img: { alt: "", src: "" }
  e.g. { picture: [
    { source: { srcset: "", sizes: "" } },
    { source: { srcset: "", sizes: "" } },
    { img: { alt: "", src: "" } },
  ]}
 */

// eslint-disable-next-line complexity,sonarjs/cognitive-complexity,max-statements
function generateObject(metadata, attributes = {}) {
  attributes = { ...DEFAULT_ATTRIBUTES, ...attributes };
  // The attributes.src gets overwritten later on. Save it here to make the error outputs less cryptic.
  const originalSrc = attributes.src;

  if (attributes.alt === undefined) {
    // You bet we throw an error on missing alt (alt="" works okay)
    throw new Error(
      `Missing \`alt\` attribute on eleventy-img shortcode from: ${originalSrc}`
    );
  }

  const formats = Object.keys(metadata);
  const values = Object.values(metadata);
  let entryCount = 0;
  for (const imageFormat of values) {
    entryCount += imageFormat.length;
  }

  if (entryCount === 0) {
    throw new Error(
      'No image results found from `eleventy-img` in generateHTML. Expects a results object similar to: https://www.11ty.dev/docs/plugins/image/#usage.'
    );
  }

  let lowsrc;
  let lowsrcFormat;
  for (const format of LOWSRC_FORMAT_PREFERENCE) {
    if (format in metadata && metadata[format].length) {
      lowsrcFormat = format;
      lowsrc = metadata[lowsrcFormat];
      break;
    }
  }

  if (!lowsrc || !lowsrc.length) {
    throw new Error(
      `Could not find the lowest <img> source for responsive markup for ${originalSrc}`
    );
  }

  attributes.src = `${process.env.STATIC_PATH ? process.env.STATIC_PATH : ''}${
    lowsrc[0].url
  }`;
  attributes.width = lowsrc[lowsrc.length - 1].width;
  attributes.height = lowsrc[lowsrc.length - 1].height;

  const attributesWithoutSizes = { ...attributes };
  delete attributesWithoutSizes.sizes;

  // <img>: one format and one size
  if (entryCount === 1) {
    return { img: attributesWithoutSizes };
  }

  const missingSizesErrorMessage = `Missing \`sizes\` attribute on eleventy-img shortcode from: ${
    originalSrc || attributes.src
  }`;

  // <img srcset>: one format and multiple sizes
  if (formats.length === 1) {
    // implied entryCount > 1
    if (entryCount > 1 && !attributes.sizes) {
      // Per the HTML specification sizes is required when multiple sources are in srcset
      // The default "100vw" is okay
      throw new Error(missingSizesErrorMessage);
    }

    const imgAttributes = { ...attributesWithoutSizes };
    const srcsetAttrValue = Object.values(lowsrc)
      .map(
        (entry) =>
          `${process.env.STATIC_PATH ? process.env.STATIC_PATH : ''}${
            entry.srcset
          }`
      )
      .join(', ');
    imgAttributes.srcset = srcsetAttrValue;
    imgAttributes.sizes = attributes.sizes;

    return { img: imgAttributes };
  }

  const children = [];
  values
    .filter((imageFormat) => {
      return (
        imageFormat.length > 0 &&
        (lowsrcFormat !== imageFormat[0].format || imageFormat.length !== 1)
      );
    })
    .forEach((imageFormat) => {
      if (imageFormat.length > 1 && !attributes.sizes) {
        // Per the HTML specification sizes is required when multiple sources are in srcset
        // The default "100vw" is okay
        throw new Error(missingSizesErrorMessage);
      }

      const sourceAttrs = {
        type: imageFormat[0].sourceType,
        srcset: imageFormat
          .map(
            (entry) =>
              `${process.env.STATIC_PATH ? process.env.STATIC_PATH : ''}${
                entry.srcset
              }`
          )
          .join(', '),
      };

      if (attributes.sizes) {
        sourceAttrs.sizes = attributes.sizes;
      }

      children.push({
        source: sourceAttrs,
      });
    });

  children.push({
    img: omit(attributesWithoutSizes, ['width', 'height']),
  });

  return {
    picture: children,
  };
}

function mapObjectToHTML(tagName, attrs = {}) {
  const attrHtml = Object.entries(attrs)
    .map((entry) => {
      const [key, value] = entry;
      return `${key}="${value}"`;
    })
    .join(' ');

  return `<${tagName}${attrHtml ? ` ${attrHtml}` : ''}>`;
}

function generateHTML(metadata, attributes = {}, options = {}) {
  const isInline = options.whitespaceMode !== 'block';
  const markup = [];
  const { pictureClass, ...restAttributes } = attributes;
  const obj = generateObject(metadata, restAttributes);
  for (const tag in obj) {
    if (!Array.isArray(obj[tag])) {
      markup.push(mapObjectToHTML(tag, obj[tag]));
    } else {
      markup.push(`<${tag}${pictureClass ? ` class="${pictureClass}"` : ''}>`);
      for (const child of obj[tag]) {
        const childTagName = Object.keys(child)[0];
        markup.push(
          (!isInline ? '  ' : '') +
            mapObjectToHTML(childTagName, child[childTagName])
        );
      }
      markup.push(`</${tag}>`);
    }
  }
  return markup.join(!isInline ? '\n' : '');
}

module.exports = generateHTML;
