'use strict';

var browsersync = require('browser-sync').create(),
		gulp 				= require('gulp'),
		imagemin 		= require('gulp-imagemin'),
		notify 			= require('gulp-notify'),
		size 				= require('gulp-size');

// include paths file
var paths = require('../paths');

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