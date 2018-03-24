'use strict';

var gulp 					= require('gulp'),
		requireDir		= require('require-dir'),
		tasks					= requireDir('./gulp/tasks', { recurse: true });

// Include paths file
var paths 				= require('./gulp/paths');

// 'gulp build' -- build assets
gulp.task('build', gulp.series(
	gulp.series('clean', 'styles', 'scripts', 'images', 'html')
));

// 'gulp' -- default task execution
gulp.task('default', gulp.series('build', 'serve'));
