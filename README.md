# laravel-elixir-postcss
(Support for Elixir V3) Laravel Elixir PostCSS Extension.


## Install

```sh
$ npm install laravel-elixir-postcss --save-dev
```


## Usage

```javascript

elixir.postcss(src:'app.css', options);

```

Example:

```javascript

var elixir = require('laravel-elixir');

require('laravel-elixir-postcss');

elixir(function(mix) {
  
  //app.css, *.css, **/*.css    
  mix.postcss('app.css', {
    plugins:[ //postcss's plugins
      require('postcss-nested')
    ] 
  });

});

```

Or run `PostCSS` with `csstyle`:

```javascript

...

elixir(function(mix) {
  
  mix.postcss('app.css', {
    plugins:[ 
      require('postcss-nested'),
      require('csstyle')
    ] 
  });

});

```

Then run:

```sh
$ gulp
```

Or run `gulp watch`


## Default Options

```javascript
{
  output  : 'public/css',
  plugins : [],
  srcDir  : 'resources/assets/postcss/'
}
```
