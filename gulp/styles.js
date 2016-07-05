'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');

gulp.task('styles', function () {

  var injectFiles = gulp.src([
    path.join(conf.paths.src, '/app/**/*.styl'),
    path.join('!' + conf.paths.src, '/app/index.styl'),
    path.join('!' + conf.paths.src, '/app/vendor.styl')
  ], { read: false });

  var injectOptions = {
    transform: function(filePath) {
      filePath = filePath.replace(path.join(conf.paths.src, '/app/'), '');
      return '@import \'' + filePath + '\';';
    },
    starttag: '// injector',
    endtag: '// endinjector',
    addRootSlash: false
  };

  var indexFilter = $.filter('index.styl');
  var vendorFilter = $.filter('vendor.styl');

  return gulp.src([
    path.join(conf.paths.src, '/app/index.styl'),
    path.join(conf.paths.src, '/app/vendor.styl')
  ])
    .pipe(indexFilter)
    .pipe($.inject(injectFiles, injectOptions))
    .pipe(indexFilter.restore())
    .pipe(vendorFilter)
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe(vendorFilter.restore())
    .pipe($.sourcemaps.init())
    .pipe($.stylus()).on('error', conf.errorHandler('Stylus'))
    .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app/')))
    .pipe(browserSync.reload({ stream: true }));
});
