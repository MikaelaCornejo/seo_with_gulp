'use strict';

var autoprefixer = require('autoprefixer'),
		browsersync  = require('browser-sync').create(),
		concat       = require('gulp-concat'),
		concatcss    = require('gulp-concat-css'),
		cssimport    = require('gulp-cssimport'),
		csslint      = require('gulp-csslint'),
		cssnano      = require('gulp-cssnano'),
		gulp         = require('gulp'),
		gzip         = require('gulp-gzip'),
		notify       = require('gulp-notify'),
		plumber      = require('gulp-plumber'),
		postcss      = require('gulp-postcss'),
		sass         = require('gulp-sass'),
		size         = require('gulp-size'),
		sourcemaps   = require('gulp-sourcemaps'),
		uglify       = require('gulp-uglify');

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
		]
	}),
	cssnano,
	csslint
];

gulp.task('styles', () => 
	gulp.src(paths.scssSourceFiles + 'style.scss')
		.pipe(plumber())
		.pipe(sass({
			outputStyle: 'compressed',
			includePaths: [
				paths.scssFilesGlob
			]
		}).on('error', sass.logError))
		.pipe(cssimport())
		.pipe(postcss(processors))
		.pipe(concatcss('style.css'))
		.pipe(plumber.stop())		
		.pipe(sourcemaps.init())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.cssPublicFiles))
		.pipe(gzip())
		.pipe(size({
			gzip: true,
			showFiles: true
		}))
		.pipe(gulp.dest(paths.cssPublicFiles))
		.pipe(notify("Styles Task Completed"))
		.pipe(browsersync.stream())
);

// 'gulp scripts' -- compiles JS files into a single JS file, creates a sourcemap, and auto-inject into browsers
gulp.task('scripts', () =>
	gulp.src([
		paths.vendorSourceFiles + 'jquery/dist/jquery.js',
		paths.jsSourceFiles + paths.jsFilesGlob
	])
		.pipe(plumber())
		.pipe(concat('bundle.js'))
		.pipe(uglify({
			mangle: true,
			compress: {
				sequences: true,
				dead_code: true,
				conditionals: true,
				booleans: true,
				unused: true,
				if_return: true,
				join_vars: true,
				drop_console: true
			}
		}))
		.pipe(sourcemaps.init())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.jsPublicFiles))
		.pipe(gzip())
		.pipe(size({
			gzip: true,
			showFiles: true
		}))
		.pipe(gulp.dest(paths.jsPublicFiles))
		.pipe(notify("Scripts Task Completed."))
		.pipe(browsersync.stream())
);