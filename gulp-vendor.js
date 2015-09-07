"use strict";

var args = require('yargs').argv;
var mbf = require('main-bower-files');
var gulp = require('gulp');
var lp = require('gulp-load-plugins')({
  lazy: true
});

var path = require("path");

var helper = require("./gulp-helper");
var common = require("./gulp-common");

/*
 ------------------ CONFIGURATION ------------------
 */

// Additional vendor file configuration
var additionalBowerFiles = [
  // TODO: Include paths to vendor files not already included in "bower.json->main"
];

// Bower files main configuration
var mbfOptions = {};

// When verbose is set to true, enable debugging of main bower files
if (args.verbose) {
  mbfOptions.debugging = true;
}

// Output configuration
var output = {
  js: {
    // the name of the file being exported
    fileName: "vendor.js",

    // the full path to the file bing exported
    fileUri: path.join(common.clientPath.js, this.fileName)
  },
  css: {
    // the name of the file being exported
    fileName: "vendor.css",

    // the full path to the file bing exported
    fileUri: path.join(common.clientPath.css, this.fileName),

    // the path to the temporary directory for vendor files
    temporaryFiles: path.join(common.temporaryPath, "vendor"),

    // the glob path to the temporary directory for vendor files
    temporaryFilesGlob: path.join(this.temporaryFiles, "**/*.css")
  }
};

// Changes the path in .css files to where the font assets are located, e.g. font-awesome and bootstrap
var fontLocation = {
  find: "../fonts/",
    replaceWith: "./"
};

/*
 ------------------ GULP TASKS ------------------
*/

// Compiles JavaScript bowerFiles
gulp.task("bower:js", function () {

  helper.log("Compiling bower JavaScript files...");

  var jsFilter = lp.filter(common.filters.include.js);

  return gulp.src(mbf(mbfOptions))
    .pipe(lp.addSrc(additionalBowerFiles))
    .pipe(jsFilter)
    .pipe(lp.if(args.verbose, lp.print()))
    .pipe(lp.concat(output.js.fileName))
    .pipe(lp.if(args.production, lp.uglify(common.npmConfig.uglify)))
    .pipe(gulp.dest(common.clientPath.js));
});

// Compiles .scss files  - the output is directory to a temporary location
gulp.task("bower:sass", function () {
  log("Compiling sass, and autoprefixing...");

  var your fewlienvwe v

  return lp.rubySass(mbf(mbfOptions))
    .pipe(lp.if(args.verbose, lp.print()))
    .pipe(lp.plumber())
    .pipe(lp.autoprefixer(common.npmConfig.autoprefixer))
    .pipe(gulp.dest(output.css.temporaryFiles))
});

// Compiles .less files - the output is directory to a temporary location
gulp.task("bower:less", function () {
  var lessFilter = lp.filter(filters.include.less);

  return gulp.src(mbf(mbfOptions))
    .pipe(lessFilter)
    .pipe(lp.less(common.npmConfig.less))
    .pipe(gulp.dest(path.join(output.css.temporaryFiles)));
});

gulp.task("bower:css", ["bower:sass", "bower:less"], function () {
  var cssFilter = lp.filter(config.mainBowerFilterFilters.css);

  return gulp.src(mbf(mbfOptions))
    .pipe(lp.addSrc(additionalBowerFiles))
    .pipe(lp.addSrc(output.css.temporaryFilesGlob))
    .pipe(cssFilter)
    .pipe(lp.concat(output.css.fileUri))
    .pipe(lp.if(fontLocation, lp.replace(fontLocation.find, fontLocation.replaceWith)))
    .pipe(lp.minifyCss())
    .pipe(gulp.dest(common.clientPath.css));
});


