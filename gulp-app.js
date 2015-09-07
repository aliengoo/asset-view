"use strict";

var args = require('yargs').argv;
var gulp = require('gulp');
var lp = require('gulp-load-plugins')({
  lazy: true
});

var path = require("path");

var helper = require("./gulp-helper");
var commonConfig = require("./gulp-common-config");

/*
 ------------------ TEMPORARY FILE CONFIGURATION ------------------
 */
var temporaryFiles = path.join(commonConfig.temporaryPath, "app");

/*
 ------------------ INPUT CONFIGURATION ------------------
 */
var input = {
  scss: ["styles/*.scss"],
  typescript: [path.join(commonConfig.src.root, "**/*.ts")],
  js: {
    temporaryFilePath: path.join(temporaryFiles, "app.js")
  }
};

/*
 ------------------ OUTPUT CONFIGURATION ------------------

 with some acting as inputs to other steps
 */

/*
 ------------------ JAVASCRIPT CONFIGURATION ------------------
 */
var outputJs = {

  // the name of the file being exported
  fileName: "app.js",

  // the temporary file name containing compiled templates (angular-template-cache)
  temporaryTemplateFileName: "templates.js",

  // the glob path to the temporary directory for vendor files, e.g. output from less and sass compilation
  temporaryFilesGlob: path.join(temporaryFiles, "**/*.js")
};

// the full path to the file bing exported
outputJs.fileUri = path.join(commonConfig.publicPaths.js, outputJs.fileName);

// the temporary file URI containing compiled templates (angular-template-cache)
outputJs.temporaryTemplatesFileUri = path.join(temporaryFiles, outputJs.temporaryTemplateFileName);

/*
 ------------------ STYLE CONFIGURATION ------------------
 */
var outputCss = {
  // the name of the file being exported
  fileName: "app.css",


  // the glob path to the temporary directory for vendor files, e.g. output from less and sass compilation
  temporaryFilesGlob: [path.join(temporaryFiles, "**/*.css")]
};

// the full path to the file bing exported
outputCss.fileUri = path.join(commonConfig.publicPaths.css, outputCss.fileName);

/*
 ------------------ STYLE TASKS ------------------
 */
gulp.task("clean:app-styles", function (done) {
  helper.clean(outputCss.temporaryFilesGlob, done);
});

gulp.task("styles", ["clean:app-styles"], function () {
  return gulp.src((input.scss))
    .pipe(helper.sassTask())
    .pipe(gulp.dest(commonConfig.publicPaths.css))
    .pipe(helper.livereloadTask());
});

/*
 ------------------ JAVASCRIPT TASKS ------------------
 */

/* CLEAN */
gulp.task("clean:app-js", function (done) {


  helper.clean(outputJs.temporaryFilesGlob, done);
});

/* BUILD TYPESCRIPT */
gulp.task('build:ts', ['clean:app-js'], function () {
  return gulp.src(input.typescript)
    .pipe(lp.typescript({
      noImplicitAny: true,
      out: outputJs.fileName
    })).js.pipe(gulp.dest(temporaryFiles));
});

/*

 BUILD JAVASCRIPT, ANNOTATE

 gulp-ngAnnotate requires ngInject attribute to work

 */
gulp.task('build:js', ['build:ts'], function () {
  return gulp.src(input.js.temporaryFilePath)
    .pipe(lp.ngAnnotate(commonConfig.npmConfig.ngAnnotate))
    .pipe(gulp.dest(temporaryFiles));
});

/*
 BUILD HTML AND JADE TEMPLATES INTO ANGULAR MODULE

 */
gulp.task("clean:templates-js", function (done) {
  helper.clean(outputJs.temporaryTemplatesFileUri, done);
});

gulp.task("build:html-templates", function () {
});

gulp.task('build:templates', ['clean:templates-js'], function () {
  return gulp.src(commonConfig.src.glob)
    .pipe(lp.plumber())
    .pipe(commonConfig.filters.include.html)
    .pipe(helper.angularTemplateCacheTask())
    .pipe(commonConfig.filters.include.html.restore())
    .pipe(commonConfig.filters.include.jade)
    .pipe(lp.jade(commonConfig.npmConfig.jade))
    .pipe(helper.angularTemplateCacheTask())
    .pipe(lp.concat(outputJs.temporaryTemplateFileName))
    .pipe(gulp.dest(temporaryFiles));
});

/*
 MAIN BUILD TASK
 */
gulp.task('build', ['build:js', 'build:templates'], function () {
  helper.log("Preparing final application JavaScript file...");

  return gulp.src(outputJs.temporaryFilesGlob)
    .pipe(helper.jsTaskFn(outputJs.fileName)())
    .pipe(gulp.dest(commonConfig.publicPaths.js))
    .pipe(helper.livereloadTask());
});








