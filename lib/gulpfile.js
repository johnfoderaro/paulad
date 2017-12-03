const browserify = require('browserify');
const bs = require('browser-sync').create();
const buffer = require('vinyl-buffer');
const gulp = require('gulp');
const gutil = require('gulp-util');
const metalsmith = require('./metalsmith');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const source = require('vinyl-source-stream');

const config = require('./../config/gulp');

let maps;
let minify;

function compileCss(options) {
  return gulp.src(options.main)
    .pipe(sass({
      sourceMapEmbed: maps,
      outputStyle: 'compressed',
    }).on('error', sass.logError))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(options.dest));
}

function compileJs(options) {
  return browserify(options.main, { debug: maps })
    .transform('babelify', { presets: ['env'] })
    .transform('uglifyify', { global: minify })
    .bundle()
    .pipe(source(options.src))
    .pipe(buffer())
    .pipe(gulp.dest(options.dest));
}

// tasks
gulp.task('css', () => {
  const app = config.css.app;
  return compileCss({
    main: app.main,
    dest: app.dest,
  });
});

gulp.task('js', () => {
  const app = config.js.app;
  return compileJs({
    main: app.main,
    src: app.src,
    dest: app.dest,
  });
});

gulp.task('build', done => metalsmith((err) => {
  if (err) return gutil.log(err);
  bs.reload();
  return done();
}));

gulp.task('development', ['build'], () => {
  const app = {
    css: config.css.app.watch,
    js: config.js.app.watch,
    watch: config.watch,
  };
  maps = true;
  minify = false;
  bs.init(config.browserSync);
  gulp.watch(app.css, ['css']);
  gulp.watch(app.js, ['js']);
  gulp.watch(app.watch, ['build']);
});
