'use strict';

var _            = require('underscore');
var elixir       = require('laravel-elixir');
var notification = require('laravel-elixir/Notification');
var gulp         = require('gulp');
var gutil        = require('gulp-util');
var plugins      = require('gulp-load-plugins')();
var config       = elixir.config;

elixir.extend('postcss', function(src, options) {

  var name = 'postcss';

  var css = config.css;

  options = _.extend({
    output: 'public/css',
    plugins: [],
    srcDir: 'resources/assets/postcss/',
    sourcemaps: options.sourcemaps ? options.sourcemaps : config.sourcemaps,
  }, options);

  new elixir.Task(name, function() {

    var cssnano = css.cssnano ? css.cssnano.pluginOptions : undefined;

    var err = function(e) {
      // line break
      console.log('');
      console.log(gutil.colors.bgRed('PostCSS - Error'));
      console.log('   - ' + e.message);
    };

    return gulp.src(options.srcDir + src)
      .pipe(plugins.if(options.sourcemaps, plugins.sourcemaps.init()))
      .pipe(plugins.postcss(options.plugins).on('error', err))
      .pipe(plugins.if(config.production, plugins.cssnano(cssnano)))
      .pipe(plugins.if(options.sourcemaps, plugins.sourcemaps.write('.')))
      .pipe(gulp.dest(options.output))
      .pipe(new notification().message(name + ' Compiled!'));

  })
  .watch([options.srcDir + '/**/*.css']);

});
