'use strict';

var autoprefixer = require('autoprefixer');
var browsersync  = require('browser-sync').create();
var concat       = require('gulp-concat');
var concatcss    = require('gulp-concat-css');
var cssimport    = require('gulp-cssimport');
var csslint      = require('gulp-csslint');
var cssnano      = require('gulp-cssnano');
var gulp         = require('gulp');
var gzip         = require('gulp-gzip');
var notify       = require('gulp-notify');
var plumber      = require('gulp-plumber');
var postcss      = require('gulp-postcss');
var sass         = require('gulp-sass');
var size         = require('gulp-size');
var sourcemaps   = require('gulp-sourcemaps');
var uglify       = require('gulp-uglify');

// Include paths file 
var paths 			 = require('../paths');

// 'gulp styles' -- compiles SCSS files into a single CSS file, adds prefixes, creates a sourcemap, and auto-inject into browsers
var processors = [
	autoprefixer({
		browsers: [
			'last 2 versions',
			'> 1%',
			'ie >= 9',
			'ie_mob >= 10',
			'ff >= 30',
			'chrome >= 34',
			'safari >= 7',
			'opera >= 23',
			'ios >= 7',
			'android >= 4',
			'bb >= 10'
		],
	}),
	cssnano({
		discardComments: true
	}),
	csslint
];

gulp.task('styles', () => 
	gulp.src(paths.scssSourceFiles + 'style.scss')
		.pipe(plumber())
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(cssimport(paths.scssFilesGlob))
		.pipe(postcss(processors))
		.pipe(concatcss('style.css'))
		.pipe(plumber.stop())
		.pipe(sourcemaps.init())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.cssPublicFiles))
		.pipe(gzip())
		.pipe(size({
			title: 'styles',
			gzip: true,
			showFiles: true
		}))
		.pipe(gulp.dest(paths.cssPublicFiles))
		.pipe(notify("Styles Task Completed"))
		.pipe(browsersync.stream())
);