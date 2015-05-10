'use strict';

var elixir = require('laravel-elixir');
var notification = require('laravel-elixir/ingredients/commands/Notification');
var utilities = require('laravel-elixir/ingredients/commands/Utilities');
var _ = require('underscore');
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

elixir.extend('postcss', function(options) {

  var name = "postcss";

  var dir = elixir.config.assetsDir + name;

  options = _.extend({
    src: dir + '**/*.css',
    search: '**/*.css'
  }, options);

  var src = utilities.buildGulpSrc(options.src, dir, options.search);

  gulp.task(name, function() {

    return gulp.src(src)
      .pipe(plugins.if(elixir.config.sourcemaps, plugins.sourcemaps.init()))
      .pipe(plugins.postcss(options.processors))
      .pipe(plugins.if(elixir.config.production, plugins.minifyCss()))
      .pipe(plugins.if(elixir.config.sourcemaps, plugins.sourcemaps.write('.')))
      .pipe(gulp.dest(elixir.config.cssOutput))
      .pipe(new notification().message(name + ' Compiled!'));

  });

  return elixir.config
    .registerWatcher(name, dir + '/' + options.search)
    .queueTask("postcss");

});
