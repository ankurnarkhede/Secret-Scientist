const gulp = require('gulp')
const sourcemaps = require('gulp-sourcemaps')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const gulpif = require('gulp-if')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const minifycss = require('gulp-minify-css')
const del = require('del')
const concat = require('gulp-concat')
sass.compiler = require('node-sass')

const isEnvProduction = process.env.NODE_ENV === 'production'
const paths = {
  dirs: {
    dist: 'dist/'
  },
  handlebars: 'views/**/*.handlebars',
  images: 'public/**/*.{JPG,jpg,png,gif,ico}',
  styles: 'public/**/*.scss',
  scripts: 'public/**/*.js'
}

/**
 * Delete the dust folder before build
 * @returns {Promise<string[]> | *}
 */
const clean = () => {
  return del([
    paths.dirs.dist + '*'
  ])
}

/**
 * Compile all scripts to app.min.js and transpile ES6 code and uglify
 * @returns {*}
 */
const scripts = () => {
  return gulp.src(paths.scripts)
    .pipe(concat('app.js'))
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulpif(isEnvProduction, uglify()))
    .pipe(gulp.dest(paths.dirs.dist + '/javascripts'))
}

/**
 * Optimise styles for provided user agents, compile scss and minify
 * @returns {*}
 */
const styles = () => {
  return gulp.src(paths.styles)
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest(paths.dirs.dist))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulpif(isEnvProduction, minifycss()))
    .pipe(gulp.dest(paths.dirs.dist))
}

const images = () => {
  return gulp.src(paths.images)
    .pipe(gulp.dest(paths.dirs.dist))
}

const watch = () => {
  gulp.watch(paths.styles, gulp.series(styles))
  gulp.watch(paths.scripts, gulp.series(scripts))
  gulp.watch(paths.images, gulp.series(images))
}

// define final gulp tasks
const build = gulp.series(clean, gulp.parallel(scripts, styles, images))
const buildDev = gulp.series(build, watch)

exports.clean = clean
exports.build = build
exports.buildDev = buildDev
exports.default = build
