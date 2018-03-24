'use strict';

var del 		= require('del'),
		gulp 		= require('gulp'),
		notify	= require('gulp-notify');

// Include paths file
var paths = require('../paths');

gulp.task('clean', () => {
	return del([ paths.publicDir ]);
});

gulp.task('clean::css', () => {
	return del([ paths.cssPublicFiles ]);
});

gulp.task('clean::js', () => {
	return del([paths.jsPublicFiles]);
});

gulp.task('clean::images', () => {
	return del([paths.imagePublicFiles]);
});

gulp.task('clean::html', () => {
	return del(['*.html']);
});