# laravel-elixir-postcss
[![Build Status](https://travis-ci.org/tureki/laravel-elixir-postcss.svg?branch=master)](https://travis-ci.org/tureki/laravel-elixir-postcss)
[![npm Version](https://img.shields.io/npm/v/laravel-elixir-postcss.svg)](https://www.npmjs.com/package/laravel-elixir-postcss)
[![npm License](https://img.shields.io/npm/l/laravel-elixir-postcss.svg)](https://www.npmjs.com/package/laravel-elixir-postcss)

This Laravel Elixir extension allows you easy to compile PostCSS.

If this package helpful and save your time. Do not forget star it :)


## Installation

```bash
$ npm install laravel-elixir-postcss --save-dev
```


## Usage

```javascript
elixir(function(mix) {
  //app.css, *.css, **/*.css
   elixir.postcss('app.css');
});
```

#### Using PostCSS Plugins

```javascript
elixir(function(mix) {
  mix.postcss('app.css', {
    plugins:[
      require('postcss-nested')
    ]
  });
});
```

#### Using Other Parser

You can set the [options](https://github.com/postcss/postcss#options) using other parsers like `scss`, `sugarss` etc.

```javascript
elixir(function(mix) {
  mix.postcss('app.css', {
    options: {
      parser: require('postcss-scss')
    },
  });
});
```

Use `parser` and `plugins`.
```javascript
elixir(function(mix) {
  mix.postcss('app.css', {
    options: {
      parser: require('sugarss')
    },
    plugins: [
      require('postcss-nested')
    ],
  });
});
```


## Options

This extension accept two parameters:

* An string of files.
* An object of options.

Common options:

* `options`: See [postcss common options](https://github.com/postcss/postcss#options).
* `output`: destination's path
* `plugins`: postcss's plugins.
* `srcPath`: source's directory.
* `sourcemaps`: enable source map.
* `watchs`: additional watch directories.

#### Default Value
```javascript
{
  options: {},
  output  : 'public/css',
  plugins : [],
  srcPath  : 'resources/assets/postcss/',
  sourcemaps: true, //default value follow `elixir.config.sourcemaps`
  watchs: [],
}
```


## Contributing
Welcome [PR](https://github.com/tureki/laravel-elixir-postcss/pulls) and play it :smile:
