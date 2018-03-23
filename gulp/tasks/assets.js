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
		htmlmin 		 = require('gulp-htmlmin'),
		imagemin 		 = require('gulp-imagemin'),
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
		.pipe(concatcss('style.css'))
		.pipe(postcss(processors))
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
		paths.jsFilesGlob
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

// 'gulp images' -- optimizes images
gulp.task('images', () =>
	gulp.src(paths.imageFilesGlob)
		.pipe(imagemin([
			imagemin.gifsicle({ interlaced: true }),
			imagemin.jpegtran({ progressive: true }),
			imagemin.optipng(),
			imagemin.svgo({ plugins: [{ cleanupIDs: false }] })
		], { verbose: true }))
		.pipe(size({
			showFiles: true
		}))
		.pipe(gulp.dest(paths.imagePublicFiles))
		.pipe(notify("Images Task Completed."))
		.pipe(browsersync.stream())
);

// 'gulp html' -- minifies HTML files
gulp.task('html', () =>
	gulp.src(paths.htmlFilesGlob)
		.pipe(htmlmin({
			collapseWhitespace: true,
			collapseInlineTagWhitespace: true,
			html5: true,
			caseSensitive: true
		}))
		.pipe(size({
			showFiles: true
		}))
		.pipe(gulp.dest("."))
		.pipe(notify("HTML Task Completed."))
		.pipe(browsersync.stream({ once: true }))
);

// Reload site when changes are noticed
function reload(done) {
	browsersync.reload;
	done();
}

// 'gulp serve' -- serve site in browser and watch for changes in source folder and reload site automatically
gulp.task('serve', (done) => {
	browsersync.init({
		server: {
			baseDir: '.'
		},
		open: false,
		injectChanges: true
	});

	gulp.watch(paths.scssFilesGlob, gulp.series('styles', reload));
	gulp.watch(paths.jsFilesGlob, gulp.series('scripts', reload));
	gulp.watch(paths.imageFilesGlob, gulp.series('images', reload));
	gulp.watch(paths.htmlFilesGlob, gulp.series('html', reload));
});