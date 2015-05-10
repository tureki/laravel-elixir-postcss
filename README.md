# laravel-elixir-postcss
Laravel Elixir PostCSS Extension.

## Install

```sh
$ npm install laravel-elixir-postcss --save-dev
```

## Usage

```javascript

var elixir = require('laravel-elixir');

require('laravel-elixir-postcss');

elixir(function(mix) {
 
    mix.postcss({
      src:'app.css',
      processors:[ require('postcss-nested') ] //postcss's plugins
    });

});

```

Or run `PostCSS` with `csstyle`:

```javascript

...

elixir(function(mix) {
 
    mix.postcss({
      src:'app.css',
      processors:[ require('postcss-nested'), require('csstyle') ]
    });

});

```

Then run:

```sh
$ gulp
```
