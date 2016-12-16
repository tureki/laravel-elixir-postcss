'use strict';

var _            = require('underscore');
var elixir       = require('laravel-elixir');
var gulp         = require('gulp');
var gutil        = require('gulp-util');
var plugins      = require('gulp-load-plugins')();
var config       = elixir.config;

elixir.extend('postcss', function(src, opts) {

  var css = config.css;
  var name = 'postcss';
  var notification = elixir.Notification ? elixir.Notification : require('laravel-elixir/Notification');

  opts = _.extend({}, opts);

  opts = _.extend({
    output: 'public/css',
    plugins: [],
    srcPath: 'resources/assets/postcss/',
    sourcemaps: opts.sourcemaps ? opts.sourcemaps : config.sourcemaps,
    watch: [],
  }, opts);

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
        this.src = opts.srcPath + src;
        this.output = opts.output;
    }

    return gulp.src(opts.srcPath + src)
      .pipe(plugins.if(opts.sourcemaps, plugins.sourcemaps.init()))
      .pipe(plugins.postcss(opts.plugins).on('error', err))
      .pipe(plugins.if(config.production, plugins.cssnano(cssnano)))
      .pipe(plugins.if(opts.sourcemaps, plugins.sourcemaps.write('.')))
      .pipe(gulp.dest(opts.output))
      .pipe(new notification().message(name + ' Compiled!'));
  })
  .watch(_.union([opts.srcPath + '/**/*.css'], opts.watch));

});
