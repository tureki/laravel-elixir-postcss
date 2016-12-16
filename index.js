'use strict';

var _            = require('underscore');
var elixir       = require('laravel-elixir');
var gulp         = require('gulp');
var gutil        = require('gulp-util');
var $      = require('gulp-load-plugins')();
var config       = elixir.config;

elixir.extend('postcss', function(src, opts) {

  var css = config.css;
  var name = 'postcss';
  var notification = elixir.Notification ? elixir.Notification : require('laravel-elixir/Notification');

  opts = _.extend({}, opts);

  opts = _.extend({
    output: config.publicPath + '/' + config.css.folder,
    options: {},
    plugins: [],
    srcPath: config.assetsPath + '/' + name,
    sourcemaps: opts.sourcemaps ? opts.sourcemaps : config.sourcemaps,
    watch: [],
  }, opts);

  new elixir.Task(name, function() {

    var cssnano = css.cssnano ? css.cssnano.pluginOptions : undefined;
    var srcPath = opts.srcPath + '/' + src;

    var err = function(e) {
      // line break
      console.log('');
      console.log(gutil.colors.bgRed('PostCSS - Error'));
      console.log('   - ' + e.message);
    };

    if(typeof this.recordStep !== 'undefined') {
        this.recordStep('Post processing CSS');
        this.src = srcPath;
        this.output = opts.output;
    }

    return gulp.src(srcPath)
      .pipe($.if(opts.sourcemaps, $.sourcemaps.init()))
      .pipe($.postcss(opts.plugins, opts.options).on('error', err))
      .pipe($.if(config.production, $.cssnano(cssnano)))
      .pipe($.if(opts.sourcemaps, $.sourcemaps.write('.')))
      .pipe(gulp.dest(opts.output))
      .pipe(new notification().message(name + ' Compiled!'));
  })
  .watch(_.union([opts.srcPath + '/**/*.css'], opts.watch));

});
