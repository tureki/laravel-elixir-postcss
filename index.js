'use strict';

var _ = require('underscore');
var elixir = require('laravel-elixir');
var gulp = require('gulp');
var notification = require('laravel-elixir/ingredients/commands/Notification');
var plugins = require('gulp-load-plugins')();
var utilities = require('laravel-elixir/ingredients/commands/Utilities');

elixir.extend('postcss', function(src, options) {

  var config = this;

  var name = "postcss";

  options = _.extend({
    output: config.cssOutput,
    plugins: [],
    srcDir: config.assetsDir + name,
    search: '/**/*.css'
  }, options);

  var src = utilities.buildGulpSrc(src, options.srcDir);

  gulp.task(name, function() {

    return gulp.src(src)
      .pipe(plugins.if(config.sourcemaps, plugins.sourcemaps.init()))
      .pipe(plugins.postcss(options.plugins))
      .pipe(plugins.if(config.production, plugins.minifyCss()))
      .pipe(plugins.if(config.sourcemaps, plugins.sourcemaps.write('.')))
      .pipe(gulp.dest(options.output))
      .pipe(new notification().message(name + ' Compiled!'));

  });

  return config
    .registerWatcher(name, options.srcDir + options.search)
    .queueTask("postcss");

});
