<img style="margin-right: 10px;" src="src/svg/logo-with-text.svg" alt="" />

# Jamstack compatiple 11ty Boilerplate

# Nunjucks + SCSS + TailwindCSS(JIT) + ESNext starter based on 11ty and Gulp ✨

## Netlify demo page with examples and additional bits of documentation and examples

[https://frontenso-11ty-starter.netlify.app/](https://frontenso-11ty-starter.netlify.app/)

# Table of Contents

- [Jamstack compatible 11ty Boilerplate](#jamstack-compatible-11ty-boilerplate)
- [Netlify demo page](#netlify-demo-page)
- [Features](#features)
- [Getting started](#getting-started)
  - [Using this repository as a template](#using-this-repository-as-a-template)
  - [Running for development](#running-for-development)
  - [Build the project for production environment](#build-the-project-for-production-environment)
  - [Creating a zip-archive `build.zip`](#creating-a-zip-archive-buildzip)
- [Component-based Approach](#component-based-approach)
- [Modern Image Formats](#modern-image-formats)
- [Image Quality Settings](#image-quality-settings)
- [TypeScript (optional)](#typescript-optional)
- [TailwindCSS (optional)](#tailwindcss-optional)
- [Nunjucks HTML template engine](#nunjucks-html-template-engine)
- [Using a different template engine](#using-a-different-template-engine)
- [Webpack v5](#webpack-v5)
- [Customize static path](#customize-static-path)
- [.env file and environment variables](#env-file-and-environment-variables)
- [The SVG sprite](#the-svg-sprite)
- [{% image %} Nunjucks tag](#-image-nunjucks-tag)
- [Inlining images as base64 strings inside Nunjucks templates using `inline` filter](#inlining-images-as-base64-strings-inside-nunjucks-templates-using-inline-filter)
- [Inlining raster or svg images in CSS](#inlining-raster-or-svg-images-in-css)
- [Example of using `if` statement in an HTML attribute](#example-of-using-if-statement-in-an-html-attribute)
- [Examples](#examples)
- [Useful links](#useful-links)

## Features

This starter kit is built on a component-based structure, utilizing the power of Nunjucks, SCSS, and TailwindCSS (with a Just-in-Time compiler), Webpack, ESNext, and live reloading. Modern image formats out of the box (AVIF, WebP) and image optimization.

It uses 11ty to handle HTML generation and Gulp for the rest of the build process.

Core features:

- Component-based approach.
- Fast builds with Gulp and SCSS support.
- Modern image formats out of the box (AVIF, WebP) and image optimization.
- No JS-framework dependencies (you can add preact or any other framework though).
- Live reloading.
- Linters included.
- Webpack config for most cases.
- (Optional) TailwindCSS with JIT.
- (Optional) TypeScript support using JSDoc notation.

It is flexible and can be used in conjunction with any data source, whether it be a headless CMS, JSON, Markdown or any other data source that can be fetched via JavaScript. For more information on how to work with data sources, please refer to the [11ty documentation](https://www.11ty.dev/docs/data/).

## Getting started

### Using this repository as a template

This repository can be a perfect starting point for your next project. By simply clicking on the green "Use this template" button on this GitHub page, you can easily create a new repository. After creating a new repository you can customize and configure it to your liking and begin your development journey with ease.

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

### Build the project for production environment:

```
npm run build
```

### Creating a zip-archive `build.zip`:

```
npm run zip
```

This command uses `npm run build` to build the project and then creates a zip-archive `build.zip` in the root folder of the project.

## Component-based Approach

Decomposing the UI into separate, less coupled components is highly recommended for many reasons.

It is a best practice to create components for parts of the UI that appear in multiple places in your project, such as buttons, common page sections, widgets, and sliders.

To keep your components organized, it is a good idea to keep them inside the `src/components/` folder. This starter kit allows you to keep the markup, styles, and JavaScript code for a component all in one place, making it easy to use them in multiple locations throughout your project. Take a look at the `src/components/` folder for examples of how different types of components are arranged. It's important to note that it is not always necessary to include Nunjucks or JavaScript code for a component if it does not make sense to do so, for example, when the markup is quite simple or when a component does not have any JavaScript logic.

## Modern Image Formats

This starter uses `@11ty/eleventy-img` to generate modern image formats (AVIF, WebP) and optimize images. See examples on the [demo page](https://frontenso-11ty-starter.netlify.app/).

## Image Quality Settings

You can change image compression settings for avif, webp, jpeg files in `.eleventy.js` config.

Png are compressed with [pngquant](https://pngquant.org/) as it provides the best compression. You can change png compression settings in `optimize-png.js` config.

## TypeScript (optional)

This boilerplate has built-in support for TypeScript, but it is completely optional to use it during development. We have chosen to use JSDoc notation ([which is officially supported by TypeScript team](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)) to provide TypeScript support. This means that you don't have to write your code using TypeScript syntax, and can instead continue to write your code using JavaScript syntax with JSDoc notation for TypeScript support. This approach also allows you to easily disable TypeScript if you do not need it at some point during your development process, for example, to speed up development or if you have new developers working on the project who are not familiar with TypeScript.

### If you don't need TypeScript

Simply remove tsconfig.json file from your project.

## TailwindCSS (optional)

This starter kit comes with TailwindCSS support out of the box. TailwindCSS is a utility-first CSS framework that allows you to quickly build custom user interfaces. For more information on how to use TailwindCSS, please refer to the [TailwindCSS documentation](https://tailwindcss.com/docs).

### If you don't need TailwindCSS

Simply remove the following line:

```
<link rel="stylesheet" href="{{ STATIC_PATH }}/css/tailwind.css" />
```

from `src/_layouts/base.njk` file.

You can also remove `tailwindcss` section from `postcss.config.js` and remove `tailwind` gulp task from `gulpfile.js`, but it is optional.

## Nunjucks HTML template engine

[Nunjucks](https://mozilla.github.io/nunjucks/) is a powerful HTML template engine with a syntax very similar to jinja2. Nunjucks makes easier writing highly-maintainable HTML code.

Nunjucks templates seat in `src/_layouts/`, `src/components/` folders.

To make the most out of Nunjucks, it is recommended to read through its [documentation](https://mozilla.github.io/nunjucks/templating.html). This will give you a good understanding of its features and how to use them effectively in your project.

You can also read [11ty documentation](https://www.11ty.dev/docs/languages/nunjucks/) on templating and [data sources](https://www.11ty.dev/docs/data/).

Another tip for working with Nunjucks is to ensure that your code editor has syntax highlighting for Nunjucks. If your editor does not have native support for Nunjucks, you can set up the syntax highlighting for the Twig template engine instead. This can be done by configuring your editor to use the Twig syntax highlighting when opening .njk files.

## Using a different template engine

11ty has support for many template engines. If you prefer to use a different template engine, you can easily do so.

To do this, you need to replace Nunjucks with your desired template engine in the `.eleventy.js` file. You can find information on how to configure a different template engine in the [11ty documentation](https://www.11ty.dev/docs/languages/).

## Webpack v5

This starter kit uses Webpack v5 to build the JavaScript bundle. However, it does not have hot reloading feature enabled, as it is not necessary for static websites.

## Customize static path

This template provides the ability to customize the static path for project resources such as images, scripts, styles, etc. For example, you can use a custom CDN URL. Add an `.env` file to the root directory of the project with the following content `STATIC_PATH=http://localhost:9000` then you can reference the _STATIC_PATH_ variable in your code like this `<link rel="stylesheet" href="{{ STATIC_PATH }}/css/tailwind.css">`

**Note:** When using _STATIC_PATH_ in Nunjucks macros, it must be passed as props.

## .env file and environment variables

### Environment variables in JS code

This starter kit uses the [dotenv](https://www.npmjs.com/package/dotenv) package to load environment variables from a `.env` file. You can add environment variables to the `.env` file and use them in your code. Additionally, don't forget to include the new variable in the webpack configuration under the EnvironmentPlugin settings. After restarting the project, you will be able to reference the variable within your code like this: `process.env.MY_VARIABLE`.

### Environment variables in Nunjucks templates

If you need to use environment variables in Nunjucks templates, you can add JS files for the variables in `src/_data/` folder and then reference them in Nunjucks templates like this: `{{ MY_VARIABLE }}`. As an example, see the `src/_data/STATIC_PATH.js` file.

## The SVG sprite

This starter features a convenient way to include SVG files through the use of SVG sprites. By utilizing the [gulp-svgstore](https://github.com/w0rm/gulp-svgstore) plugin, it generates a single sprite containing all of your SVG files.

The SVG sprite markup is inlined in `base.njk` template using `{% svg_prite %}` shortcode function (there is no need to modify this code).

To show an SVG image on the webpage, first place it in the `src/svg` folder. For example, if the file is named `some-vector.svg`.

Then add it to the page in the following way:

```
<svg><use xlink:href="#icon-some-vector"></use></svg>
```

**Note:** `some-vector.svg` file should be located in the `src/svg` directory so that `gulp-svgstore` could add it to the SVG sprite.

You can also use CSS selectors to set properties such as the `fill` or `stroke` for this element on the page, without having to edit the SVG file. Additionally, you can even animate specific parts of the SVG element, such as a `<path>` or `<circle>`.

You can also take a look at the `<svg>` examples in the `index.njk`.

## {% image %} Nunjucks tag

This feature allows you to easily create AVIF and WebP images. It automatically generates multiple sizes for the `srcset` attribute based on the maximum width specified (the third argument) and the widths defined in the `.eleventy.js` configuration file.

If you need to add CSS class to `<picture>` tag then pass it as `pictureClass` among the options (second argument). To add CSS class to `<img>` pass `class` to `options` argument.

See examples in `index.njk` to get familiar with `{% image %}` tag.

### Inlining images as base64 strings inside Nunjucks templates using `inline` filter

This may become a useful approach if you need to display an image instantly on the page without making a request to the server.

```
<img src="{{ 'src/images/some-image.png' | inline }}" alt="" />
```

<b>Warning!</b> Please use this feature with caution as it may bloat the final `HTML` file. Inlining images could be a good approach if the file is quite small, in other cases prefer `{% image %}` tag.

### Inlining raster or svg images in CSS

The `postcss-assets` plugin allows to inline images into CSS code in Base64 encoding or as is for SVG files:

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

<b>Warning!</b> Use this feature with caution as it may cause the final CSS file to become large. Inlining images is a good option if the file is relatively small, otherwise, it is recommended to use the `{% image %}` tag instead.

## Example of using `if` statement in an HTML attribute

This starter uses twig melody parser to format .njk files with Prettier automatically on each commit. However, there is a known issue when trying to use {% if %} block in a HTML attribute.

For example, the following code would throw a syntax error during the code formatting:

```
<p class="{% if someExpression %}some-class-name{% endif %}">Some paragraph</p>
```

To avoid it use {% set %} wrapped in HTML comment (melody parser ignore HTML comments by default) like this:

```
<!-- {% set someClass = "some-class" if true %} -->
```

then you can use `someClass` in the markup like this.

```
<p class="{{ someClass }}">
```

Use any other expression instead of `true` in {% set %} block. You can also use `else` if you need. This syntax is called `if expression` in Nunjucks. It is similar to JavaScript ternary or Python one-line if expression.

For example, this text has HTML class attribute (check the code) calculated using an `if` statement and `{% set %}` block.

**NOTE. If you are still experiencing issues with formatting .njk files, just remove `prettier-plugin-twig-nunjucks-melody` npm package from your project and .njk files will not be formatted anymore.**

## Examples

For code examples, please refer to `src/index.njk`.

To see them live, open the index page in the browser by running `npm start` and going to [http://localhost:9000](http://localhost:9000)

You can also check them on the [live demo page](https://frontenso-11ty-starter.netlify.app/)

## Useful links

[Nunjucks syntax](https://mozilla.github.io/nunjucks/templating.html)

[TailwindCSS](https://tailwindcss.com/)

[TailwindCSS Cheatsheet](https://nerdcave.com/tailwind-cheat-sheet)
