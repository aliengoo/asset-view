"use strict";

var mbf = require('main-bower-files');
var gulp = require('gulp');
var lp = require('gulp-load-plugins')({
  lazy: true
});

var path = require("path");

var client = require("../package.json").workflow.client;

var helper = require("./gulp-build.helper");
var reusableTasks = require("./gulp-build.reusable-tasks");
var publicPaths = require("./gulp-config.public-paths");
var filters = require("./gulp-config.filters");
var npm = require("./gulp-config.npm");

var temporaryFilesPath = path.join(client.temp.root, "vendor");
var icomoonFilesGlob = path.join(client.vendor.icomoon.root, "**");


/*
 ------------------ GULP TASKS ------------------
*/

// Compiles JavaScript bowerFiles
gulp.task("vendor:js", function () {

  var jsFilter = lp.filter(filters.js);

  return gulp.src(mbf(npm.mainBowerFiles))
    .pipe(lp.addSrc(client.vendor.src.additionalFiles))
    .pipe(jsFilter)
    .pipe(reusableTasks.jsTaskFn(client.vendor.src.js.outputFileName)())
    .pipe(gulp.dest(publicPaths.js));
});

// Compiles .scss files  - the output is directory to a temporary location
gulp.task("vendor:sass", function () {
  return gulp.src(mbf(npm.mainBowerFiles))
    .pipe(reusableTasks.sassTaskFn()())
    .pipe(gulp.dest(temporaryFilesPath));
});

// Compiles .less files - the output is directory to a temporary location
gulp.task("vendor:less", function () {
  return gulp.src(mbf(npm.mainBowerFiles))
    .pipe(reusableTasks.lessTaskFn()())
    .pipe(gulp.dest(temporaryFilesPath));
});

gulp.task("vendor:icomoon-fix", function() {

  var cssFilter = lp.filter(filters.css);
  var icomoon = client.vendor.icomoon;

  return gulp.src(icomoonFilesGlob)
    .pipe(cssFilter)
    .pipe(reusableTasks.replaceFn(icomoon.replace.thisValue, icomoon.replace.withThis)())
    .pipe(gulp.dest(temporaryFilesPath));
});

gulp.task("vendor:icomoon-json", function () {

  var jsonFilter = lp.filter(filters.json);

  return gulp.src(icomoonFilesGlob)
    .pipe(jsonFilter)
    .pipe(gulp.dest(publicPaths.css));
});

gulp.task("vendor:css", ["vendor:icomoon-fix", "vendor:icomoon-json", "vendor:sass", "vendor:less"], function () {

  var temporaryCssFilesGlob = path.join(temporaryFilesPath, "**/*.css");

  return gulp.src(mbf(npm.mainBowerFiles))
    .pipe(lp.addSrc(client.vendor.src.additionalFiles))
    .pipe(lp.addSrc(temporaryCssFilesGlob))
    .pipe(reusableTasks.cssTaskFn(client.vendor.src.styles.outputFileName)())
    .pipe(gulp.dest(publicPaths.css));
});


// move any other files that are not JS or CSS into the assets folder
gulp.task("vendor:assets", function () {

  var assetsFilter = lp.filter(filters.assets);

  return gulp.src(mbf(npm.mainBowerFiles))
    .pipe(reusableTasks.printTask())
    .pipe(reusableTasks.plumberTask())
    .pipe(lp.addSrc(client.vendor.src.additionalFiles))
    .pipe(lp.addSrc(icomoonFilesGlob)) // include icomoon in assets
    .pipe(assetsFilter)
    .pipe(gulp.dest(publicPaths.assets));
});

// Runs all bower tasks
gulp.task("vendor", ["vendor:js", "vendor:css", "vendor:assets"], function (done) {
  done();
});
