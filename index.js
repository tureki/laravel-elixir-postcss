'use strict';

var _            = require('underscore');
var elixir       = require('laravel-elixir');
var notification = require('laravel-elixir/Notification');
var gulp         = require('gulp');
var gutil        = require('gulp-util');
var plugins      = require('gulp-load-plugins')();
var config       = elixir.config;
var name         = 'postcss';

elixir.extend(name, function(src, options) {

  options = _.extend({
    output: 'public/css',
    plugins: [],
    srcDir: 'resources/assets/postcss/',
    search: '**/*.css'
  }, options);

  new elixir.Task(name, function() {

    var err = function(e) {
      // line break
      console.log('');
      console.log(gutil.colors.bgRed('PostCSS - Error'));
      console.log('   - ' + e.message);
    };

    return gulp.src(options.srcDir + src)
      .pipe(plugins.if(config.sourcemaps, plugins.sourcemaps.init()))
      .pipe(plugins.postcss(options.plugins).on('error', err))
      .pipe(plugins.if(config.production, plugins.minifyCss()))
      .pipe(plugins.if(config.sourcemaps, plugins.sourcemaps.write('.')))
      .pipe(gulp.dest(options.output))
      .pipe(new notification().message(name + ' Compiled!'));

  })
  .watch([options.srcDir + options.search]);

});