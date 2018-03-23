'use strict';

var gulp = require('gulp'),
		browsersync = require('browser-sync').create();

// Include paths file 
var paths = require('../paths');

// 'gulp serve' -- serve site in browser and watch for changes in source folder and reload site automatically
gulp.task('serve', () => {
	browsersync.init({
		server: {
			baseDir: '.',
			directory: true
		},
		https: true,
		online: true,
		open: true,
		cors: true,
		injectChanges: true
	});

	gulp.watch(paths.scssFilesGlob, gulp.series('styles', browsersync.reload));
	gulp.watch(paths.jsFilesGlob, gulp.series('scripts', browsersync.reload));
	gulp.watch(paths.imageFilesGlob, gulp.series('images', browsersync.reload));
});