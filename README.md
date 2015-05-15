# laravel-elixir-postcss
Laravel Elixir PostCSS Extension.

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
    plugins:[ // multi plugin
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


##Default Options

```javascript
{
  output  : config.cssOutput,
  plugins : [],
  srcDir  : config.assetsDir + 'postcss',
  search  : '/**/*.css'
}
```

