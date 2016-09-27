'use strict';

var _            = require('underscore');
var elixir       = require('laravel-elixir');
var gulp         = require('gulp');
var gutil        = require('gulp-util');
var plugins      = require('gulp-load-plugins')();
var config       = elixir.config;

elixir.extend('postcss', function(src, options) {

  var css = config.css;
  var name = 'postcss';
  var notification = elixir.Notification ? elixir.Notification : require('laravel-elixir/Notification');

  options = _.extend({}, options);

  options = _.extend({
    output: 'public/css',
    plugins: [],
    srcDir: 'resources/assets/postcss/',
    sourcemaps: options.sourcemaps ? options.sourcemaps : config.sourcemaps,
    watch: [],
  }, options);

  new elixir.Task(name, function() {

    var cssnano = css.cssnano ? css.cssnano.pluginOptions : undefined;

    var err = function(e) {
      // line break
      console.log('');
      console.log(gutil.colors.bgRed('PostCSS - Error'));
      console.log('   - ' + e.message);
    };

    if(typeof this.recordStep !== 'undefined') {
        this.recordStep('Post processing CSS');
        this.src = options.srcDir + src;
        this.output = options.output;
    }

    return gulp.src(options.srcDir + src)
      .pipe(plugins.if(options.sourcemaps, plugins.sourcemaps.init()))
      .pipe(plugins.postcss(options.plugins).on('error', err))
      .pipe(plugins.if(config.production, plugins.cssnano(cssnano)))
      .pipe(plugins.if(options.sourcemaps, plugins.sourcemaps.write('.')))
      .pipe(gulp.dest(options.output))
      .pipe(new notification().message(name + ' Compiled!'));
  })
  .watch(_.union([options.srcDir + '/**/*.css'], options.watch));

});
