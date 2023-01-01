![frontenso-eleventy-starter](./src/images/frontenso-11ty-starter.png 'Title')</br>
_by_ **[frontenso.com](https://frontenso.com)**

# Nunjucks + SCSS + TailwindCSS(JIT) + ESNext starter based on 11ty and Gulp 💪

This is a production-ready starter that features Nunjucks, SASS, TailwindCSS (with JIT compiler), Webpack, ESNext, and live reloading.

11ty is responsible for building HTML only, the rest is built with Gulp.

Can be used in conjunction with any data source either a headless CMS, JSON, markdown, or any other data source that has a possibility to fetch data using JavaScript. Please see [11ty documentation](https://www.11ty.dev/docs/data/) on data source matter.

## Getting started

### Using this repository as a template

You can use this repository as a template by simply clicking on the green "Use this template" button here on this GitHub page. You will then be redirected to configure a new repository for your new project.

### Running for development

#### 1. Install dependencies:

```
npm install
```

#### 2. Run the project for development:

```
npm start
```

#### 3. Open development URL - [`http://localhost:9000/`](http://localhost:9000/).

## Scripts

#### Running the project for development:

```
npm start
```

#### Build the project for production:

```
npm run build
```

#### Creating a production-ready zip-archive `build.zip`:

```
npm run zip
```

## Folder Structure

It's not mandatory but considered effective for many reasons to decompose the UI into separate, less coupled components.

Create components at least for the parts of the UI that appear in multiple places of your project. It can be buttons, common page sections, widgets, sliders and so on.

It is recommended that you will keep your components inside the `src/components/` folder. This starter kit allows you to keep your markup, styles, and JavaScript code for a component in one folder and then to use them in multiple places. Please, see the `src/components/` folder for examples. Notice how different types of components are arranged. Also, It is not absolutely mandatory to include Nunjucks or JS code for a component if you feel that it doesn't make too much sense. For example, when the markup is quite simple or when a component doesn't have JS logic.

## Image Quality Settings

You can change image compression settings for avif, webp, jpeg in .eleventy.js file

## TypeScript

This boilerplate supports TypeScript, however it is completely optional to use it for development. For TypeScript support, it was decided to use JSDoc notation ([officially supported TypeScript syntax](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)) because it does not make you to write .ts files with TS syntax, with this approach you can continue to write .js files with JS syntax and JSDoc notation for TypeScript support. Also, in this case you can easily disable TypeScript if you do not need it at some point of your development process. (for example, to speed up the development or if you have new developers on a project that are not familiar with TypeScript)

If you do not need TypeScript, simply remove tsconfig.json file from your project.

## Nunjucks HTML template engine

[Nunjucks](https://mozilla.github.io/nunjucks/) is a powerful HTML template engine with a syntax very similar to jinja2. Nunjucks alleviates writing highly-maintainable HTML code.

Nunjucks templates seat in `src/_layouts/`, `src/components/` folders.

To use Nunjucks more effectively, please, read its [documentation](https://mozilla.github.io/nunjucks/templating.html).

You can also read [11ty documentation](https://www.11ty.dev/docs/languages/nunjucks/) on templating and [data sources](https://www.11ty.dev/docs/data/).

Also, don't forget to add syntax highlighting for you code editor. If your editor doesn't support Nunjucks syntax, you can use syntax highlighting for Twig template engine instead. Just set up opening .njk files with Twig syntax highlighting for that.

## Using a different template engine

You can freely use any HTML engine of your choice like Pug, Handlebars or even pure HTML. In order to do that, you need to replace Nunjucks with the new template engine in `.eleventy.js`. Please refer to 11ty documentation on [how to configure a different template engine](https://www.11ty.dev/docs/languages/).

## Webpack v5

This starter features Webpack v5 for building JS bundle.

## Customize static path

This template allows you to customize the static path for project resources such as images, scripts, styles, etc (for example, it can be a custom CDN URL). Add an `.env` file to the root directory of the project with the following content `STATIC_PATH=http://localhost:9000` and use _STATIC_PATH_ like `<link rel="stylesheet" href="{{ STATIC_PATH }}/css/tailwind.css">`

**Keep mind:** To use _STATIC_PATH_ in Nunjucks macros, it must be passed as props

## The SVG sprite

It is possible to store SVG files inside a single SVG sprite. The starter uses the [gulp-svgstore](https://github.com/w0rm/gulp-svgstore) plugin to generate a sprite. SVG sprites technique is the recommended approach for adding vector images to the project.

The SVG sprite markup is inlined in `base.njk` template using `{% svg_prite %}` shortcode function (there is no need to modify this code).

To display an SVG image on the page, first add if to the `src/svg` folder. Let's suppose that this file would have the name `some-vector.svg`.

Then add it to the page in the following way:

```
<svg><use xlink:href="#icon-some-vector"></use></svg>
```

**Keep mind:** `some-vector.svg` file should be located in the `src/svg` directory so that `gulp-svgstore` could add it to the SVG sprite.

You can also set, for example, `fill` or `stroke` for this element on the page by using CSS selectors (so without setting them inside the SVG file). It is also possible to animate SVG element parts (like `<path>`, `<circle>`, etc).

You can also take a look at the `<svg>` examples in the index.njk.

## {% image %} Nunjucks tag

This tag allows generating AVIF and WebP images. It also creates srcset sizes automatically based on the given max width (the 3rd argument) and widths in the `.eleventy.js` config file.

If you need to add CSS class to <picture> tag then pass it as `pictureClass` among the options (second argument). To add CSS class to <img> pass `class` to `options` argument.

See examples in index.njk to get familiar with `{% image %}` tag.

### Inlining images as base64 strings inside Nunjucks templates using `inline` filter

This may become a useful approach if you need to display an image instantly on the page without making a request to the server.

```
<img src="{{ 'src/images/some-image.png' | inline }}" alt="" />
```

<b>Attention!</b> Please use this feature with caution as it may bloat the final `HTML` file. Inlining images could be a good approach if the file is quite small, in other cases prefer `{% image %}` tag.

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

<b>Attention!</b> Please use this feature with caution as it may bloat the final `CSS` file. Inlining images could be a good approach if the file is quite small, in other cases prefer `{% image %}` tag.

## Examples

For code examples, please refer to `src/index.njk`.

To see them live, open the index page in the browser by running `npm start` and going to [http://localhost:9000](http://localhost:9000)

You can also check them on the [live demo page](https://frontenso-11ty-starter.netlify.app/)

## Useful links

[Nunjucks syntax](https://mozilla.github.io/nunjucks/templating.html).

[TailwindCSS](https://tailwindcss.com/)

[TailwindCSS Cheatsheet](https://nerdcave.com/tailwind-cheat-sheet)
