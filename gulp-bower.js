/*
 ------------------ VENDOR/BOWER RESOURCES ------------------
 */

"use strict";

var args = require('yargs').argv;
var mbf = require('main-bower-files');
var gulp = require('gulp');
var lp = require('gulp-load-plugins')({
  lazy: true
});

var path = require("path");

var helper = require("./gulp-helper");
var commonConfig = require("./gulp-common-config");

/*
 ------------------ ADDITIONAL FILES TO INCLUDE IN THE BUILD PIPELINE ------------------
 */

var addTheseFiles = [
  // TODO: Include paths to vendor files not already included in "bower.json->main"
];

/*
 ------------------ JAVASCRIPT PATH CONFIGURATION ------------------
 */

var outputJs = {
    // the name of the file being exported
    fileName: "vendor.js"
};

// the full path to the file bing exported
outputJs.fileUri = path.join(commonConfig.publicPaths.js, outputJs.fileName);

/*
 ------------------ CSS/LESS/SASS PATH CONFIGURATION ------------------
 */

var outputCss = {
  // the name of the file being exported
  fileName: "vendor.css",

  // the path to the temporary directory for vendor files
  temporaryFiles: path.join(commonConfig.temporaryPath, "vendor")
};

// the full path to the file bing exported
outputCss.fileUri = path.join(commonConfig.publicPaths.css, outputCss.fileName);

// the glob path to the temporary directory for vendor files, e.g. output from less and sass compilation
outputCss.temporaryFilesGlob = path.join(outputCss.temporaryFiles, "**/*.css");

// Changes the path in .css files to where the font assets are located, e.g. font-awesome and bootstrap

/*
 ------------------ GULP TASKS ------------------
*/

// Compiles JavaScript bowerFiles
gulp.task("bower:js", function () {
  return gulp.src(mbf(commonConfig.npmConfig.mainBowerFiles))
    .pipe(lp.addSrc(addTheseFiles))
    .pipe(commonConfig.filters.include.js)
    .pipe(helper.jsTaskFn(outputJs.fileName)())
    .pipe(gulp.dest(commonConfig.publicPaths.js));
});

// Compiles .scss files  - the output is directory to a temporary location
gulp.task("bower:sass", function () {
  return lp.rubySass(mbf(commonConfig.npmConfig.mainBowerFiles))
    .pipe(helper.sassTask())
    .pipe(gulp.dest(outputCss.temporaryFiles))
});

// Compiles .less files - the output is directory to a temporary location
gulp.task("bower:less", function () {
  return gulp.src(mbf(commonConfig.npmConfig.mainBowerFiles))
    .pipe(helper.lessTask())
    .pipe(gulp.dest(path.join(outputCss.temporaryFiles)));
});

gulp.task("bower:css", ["bower:sass", "bower:less"], function () {
  return gulp.src(mbf(commonConfig.npmConfig.mainBowerFiles))
    .pipe(lp.addSrc(addTheseFiles))
    .pipe(lp.addSrc(outputCss.temporaryFilesGlob))
    .pipe(helper.cssTaskFn(outputCss.fileUri)())
    .pipe(gulp.dest(commonConfig.publicPaths.css));
});

// move any other files that are not JS or CSS into the assets folder
gulp.task("bower:assets", function () {
  helper.log(".... bower assets ....");

  return gulp.src(mbf(commonConfig.npmConfig.mainBowerFiles))
    .pipe(lp.addSrc(addTheseFiles))
    .pipe(commonConfig.filters.include.assets)
    .pipe(gulp.dest(commonConfig.publicPaths.assets));
});

// Runs all bower tasks
gulp.task("bower", ["bower:js", "bower:css", "bower:assets"], function (done) {
  done();
  helper.log("**** BOWER TASKS COMPLETED ****");
});
