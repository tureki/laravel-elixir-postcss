'use strict';

var _            = require('underscore');
var elixir       = require('laravel-elixir');
var notification = require('laravel-elixir/Notification');
var gulp         = require('gulp');
var plugins      = require('gulp-load-plugins')();
var config       = elixir.config;
var name         = 'postcss';

elixir.extend(name, function(src, options) {

  options = _.extend({
    output: 'public/css',
    plugins: [],
    srcDir: 'resources/assets/postcss/' + src,
    search: '/**/*.css'
  }, options);

  new elixir.Task(name, function() {

    return gulp.src(options.srcDir)
      .pipe(plugins.if(config.sourcemaps, plugins.sourcemaps.init()))
      .pipe(plugins.postcss(options.plugins))
      .pipe(plugins.if(config.production, plugins.minifyCss()))
      .pipe(plugins.if(config.sourcemaps, plugins.sourcemaps.write('.')))
      .pipe(gulp.dest(options.output))
      .pipe(new notification().message(name + ' Compiled!'));

  })
  .watch(options.srcDir + options.search);

});
