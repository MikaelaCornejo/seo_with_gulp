'use strict';

var paths = {};

// Folder naming conventions
paths.sourceFolderName 	= 'source';
paths.imageFolderName		= 'images';
paths.jsFolderName			= 'js';
paths.cssFolderName			= 'css';
paths.scssFolderName		= 'scss';
paths.publicFolderName	= 'public';
paths.vendorFolderName	= 'node_modules';

// Directory locations
paths.sourceDir					= paths.sourceFolderName + '/';
paths.publicDir					= paths.publicFolderName + '/';
paths.vendorDir 				= paths.vendorDir + '/';

// Source file locations
paths.scssSourceFiles 				= paths.sourceDir + paths.scssFolderName + '/';
paths.jsSourceFiles						= paths.sourceDir + paths.jsFolderName + '/';
paths.imageSourceFiles				= paths.sourceDir + paths.imageFolderName + '/';
paths.vendorSourceFiles				= '../' + paths.vendorFolderName;

// Public file locations
paths.cssPublicFiles 					= paths.publicFolderName + paths.cssFolderName + '/';
paths.jsPublicFiles						= paths.publicFolderName + paths.jsFolderName + '/';
paths.imagePublicFiles				= paths.publicFolderName + paths.imageFolderName + '/';

// Global patterns by file type
paths.scssPattern 						= '*.scss';
paths.jsPattern								= '*.js';
paths.imagePattern 						= '*.+(jpg|JPG|jpeg|JPEG|png|PNG|svg|SVG|gif|GIF|webp|WEBP|tif|TIF|eps|EPS)';

// File globals
paths.scssFilesGlob						= paths.scssSourceFiles + paths.scssPattern;
paths.jsFilesGlob							= paths.jsSourceFiles + paths.jsPattern;
paths.imageFilesGlob 					= paths.imageSourceFiles + paths.imagePattern;

module.exports = paths;