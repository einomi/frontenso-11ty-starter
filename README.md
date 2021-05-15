![frontenso-eleventy-starter](./src/images/frontenso-11ty-starter.png 'Title')

# Nunjucks+SCSS+TailwindCSS+ESNext starter based on 11ty and Gulp 💪

This is a production-ready starter that features Nunjucks, SASS, TailwindCSS, Webpack and ESNext.

11ty is responsible for building HTML only, the rest is built with Gulp.

Can be used in conjunction with any data source either a headless CMS, JSON, markdown, or any other data source that has a JS API. Please see [11ty documentation](https://www.11ty.dev/docs/data/) on data source matter

## Getting started

#### 1. Install dependencies:

With `yarn`

```
yarn install
```

or with `npm`:

```
npm install
```

#### 2. Run the project for development:

```
yarn start
```

or

```
npm start
```

#### 3. Open development URL - [`http://localhost:9000/`](http://localhost:9000/).

## Scripts

#### Running the project for development:

```
yarn start
```

#### Build the project for production:

```
yarn build
```

#### Creating a production-ready zip-archive `build.zip`:

```
yarn zip
```

## Folder Structure

It's not mandatory but considered effective for many reasons to decompose the UI into separate, less coupled components.

Create components at least for the parts of the UI that appear in multiple places of your project. It can be buttons, common page sections, widgets, sliders and so on.

It is recommended that you will keep your components inside the `src/components/` folder. This starter kit allows you to keep your markup, styles, and JavaScript code for a component in one folder and then to use them in multiple places. Please, see the `src/components/` folder for examples. Notice how different types of components are arranged. Also, It is not absolutely mandatory to include Nunjucks or JS code for a component if you feel that it doesn't make too much sense. For example, when the markup is quite simple or when a component doesn't have JS logic.

## Nunjucks HTML template engine

[Nunjucks](https://mozilla.github.io/nunjucks/) is a powerful HTML template engine with a syntax very similar to jinja2. Nunjucks alleviates writing highly-maintainable HTML code.

Nunjucks templates seat in `src/_layouts/`, `src/components/` folders.

To use Nunjucks more effectively, please, read its [documentation](https://mozilla.github.io/nunjucks/templating.html).

You can also read [11ty documentation](https://www.11ty.dev/docs/languages/nunjucks/) on templating and [data sources](https://www.11ty.dev/docs/data/).

Also, don't forget to add syntax highlighting for you code editor. If your editor doesn't support Nunjucks syntax, you can use syntax highlighting for Twig template engine instead. Just set up opening .njk files with Twig syntax highlighting for that.

## Webpack v5

This starter features Webpack v5 for building JS bundle.

## The SVG sprite

It is possible to automatically keep your SVG files for the project inside a single SVG sprite with the [gulp-svgstore](https://github.com/w0rm/gulp-svgstore) plugin. So that it's better to add SVG files to the project in the following way:

```
<svg><use xlink:href="#icon-some-vector-image"></use></svg>
```

Keep in mind that, in doing so, the SVG file `some-vector-image.svg` should be located in the `src/assets/svg` directory. You can also set, for example, `fill` or `stroke` for this element on the page by using CSS selectors (so without setting them inside the SVG file).

See examples in the index.njk

## The sprite file for raster images

You can use the following mixin in SASS code for making the raster sprite:

```
+s('some-image')
```

For retina images, you can use the `sr` mixin. Please, keep in mind that you need to have two images in this case `some-image.png` and `some-image@2x.png`:

```
+sr('some-image')
```

The images should be kept inside the `src/images/sprites` in `png` format.

## {% image %} Nunjucks tag

This tag allows generating AVIF and WebP images. It also creates srcset sizes automatically based on the given max width (the 3rd argument) and widths in the `.eleventy.js` config file.

## Inlining raster or svg images into HTML

<b>Attention!</b> The files, which should be inlined, have to seat in the `src/images/inline` directory.

### Inlining raster or svg images in CSS

The `postcss-assets` plugin allows to inline images into CSS code in Base64 encoding and as is for SVG files:

```
background: inline('some-image.png')
```

The plugin also can insert an image sizes:

```
width: width('some-image.png')
```

```
height: height('some-image.png')
```

```
background-size: size('some-image.png')
```

### Inlining images inside Nunjucks templates

```
<img src="{% inline 'some-image.png' %}" alt="Some image" />
```

## Useful links

[Nunjucks syntax](https://mozilla.github.io/nunjucks/templating.html).
