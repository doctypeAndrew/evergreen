const gulp = require('gulp'),
  webpack = require('webpack'),
  postcss = require('gulp-postcss'),
  prefixer = require('autoprefixer'),
  cssvars = require('postcss-simple-vars'),
  hexrgba = require('postcss-hexrgba'),
  nested = require('postcss-nested'),
  cssImport = require('postcss-import'),
  mixins = require('postcss-mixins'),
  plumber = require('gulp-plumber'),
  sourcemaps = require('gulp-sourcemaps'),
  del = require('del'),
  imagemin = require('gulp-imagemin'),
  usemin = require('gulp-usemin'),
  rev = require('gulp-rev'),
  cssnano = require('gulp-cssnano'),
  uglify = require('gulp-uglify'),
  browserSync = require('browser-sync').create();

function styles() {
  return gulp
    .src('./app/assets/styles/styles.css')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(
      postcss([
        cssImport(),
        mixins(),
        cssvars(),
        nested(),
        hexrgba(),
        prefixer()
      ])
    )
    .pipe(sourcemaps.write())
    .on('error', error => console.log(error.toString()))
    .pipe(gulp.dest('./app/temp/styles'))
    .pipe(browserSync.stream());
}
function scripts(callback) {
  webpack(require('./webpack.config'), (err, stats) => {
    if (err) {
      console.log(err.toString());
    }
    console.log(stats.toString());
  });
  callback();
}
function watch() {
  browserSync.init({
    server: './app',
    index: 'index.html',
    browser: 'google chrome',
    notify: false
  });
  gulp.watch('./app/assets/styles/**/*.scss', styles);
  gulp.watch('./app/index.html').on('change', browserSync.reload);
  gulp.watch('./app/assets/scripts/modules/*.js', scripts);
  gulp
    .watch('./app/assets/scripts/App.js', scripts)
    .on('change', browserSync.reload);
}
//Start Build Process
function deletedocsFolder() {
  return del('./docs');
}
function optimizeImages() {
  return gulp
    .src('./app/assets/images/**/*')
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }]
        })
      ])
    )
    .pipe(gulp.dest('./docs/assets/images'));
}
function optimizeHtmlCssJs() {
  return gulp
    .src('./app/index.html')
    .pipe(
      usemin({
        css: [
          function() {
            return rev();
          },
          function() {
            return cssnano();
          }
        ],
        js: [
          function() {
            return rev();
          },
          function() {
            return uglify();
          }
        ]
      })
    )
    .pipe(gulp.dest('./docs'));
}
function previewdocs() {
  browserSync.init({
    server: './docs',
    browser: 'google chrome',
    notify: false
  });
}
const build = gulp.series(
  deletedocsFolder,
  styles,
  scripts,
  gulp.parallel(optimizeImages, optimizeHtmlCssJs),
  previewdocs
);

exports.watch = watch;
exports.build = build;
