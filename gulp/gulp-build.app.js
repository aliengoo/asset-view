"use strict";

var gulp = require('gulp');
var lp = require('gulp-load-plugins')({
  lazy: true
});

var Server = require('karma').Server;
var path = require("path");
var runSequence = require("run-sequence");

var packageJson = require("../package.json");
var helper = require("./gulp-build.helper");
var reusableTasks = require("./gulp-build.reusable-tasks");
var publicPaths = require("./gulp-config.public-paths");
var filters = require("./gulp-config.filters");
var args = require("./gulp-config.command-line-args");
var npm = require("./gulp-config.npm");

var deploy = require("./gulp-deploy");

var client = packageJson.workflow.client;

/*
 ------------------ TEMPORARY BUILD PATHS AND FILES ------------------
 */

// Root for ALL temporary files
var temporaryFilesPath = path.join(client.temp.root, client.angular.mainModule);

/*
 ------------------ JAVASCRIPT TEMPORARY BUILD PATHS AND FILES ------------------
 */

// The name of the file where angular-template-cache will save the templates (as JavaScript)
var temporaryJavaScriptTemplateFileName = client.angular.templates.module + ".js";

// the glob path to the temporary directory for vendor files, e.g. output from less and sass compilation
var temporaryJavaScriptFilesGlob = path.join(temporaryFilesPath, "**/*.js");

/*
 ------------------ CLEAN STYLE TASK ------------------
 */
gulp.task("clean:app:styles", function (done) {
  var temporaryCssFilesGlob = [path.join(temporaryFilesPath, "**/*.css")];

  helper.clean(temporaryCssFilesGlob, done);
});

/*
 ------------------ PROCESS STYLE TASK ------------------
 */
gulp.task("app:styles", ["clean:app:styles"], function () {
  var scssStylesGlob = [path.join(client.src.styles.root, "/*.scss")];

  return gulp.src(scssStylesGlob)
    .pipe(reusableTasks.sassTaskFn()())
    .pipe(gulp.dest(publicPaths.css))
    .pipe(reusableTasks.livereloadTask());
});

/*
 ------------------ JAVASCRIPT TASKS ------------------
 */

/* CLEAN */
gulp.task("clean:app:js", function (done) {
  helper.clean(temporaryJavaScriptFilesGlob, done);
});

/* BUILD TYPESCRIPT */
gulp.task('app:ts', ['clean:app:js'], function () {

  var typescriptFilesGlob = [path.join(client.src.js.root, "**/*.ts")];

  return gulp.src(typescriptFilesGlob)
    .pipe(lp.plumber(npm.plumber))
    .pipe(lp.typescript({
      noImplicitAny: true,
      out: client.src.js.outputFileName
    })).js.pipe(gulp.dest(temporaryFilesPath));
});

/*

 BUILD JAVASCRIPT, ANNOTATE

 gulp-ngAnnotate requires ngInject attribute to work

 */
gulp.task('app:js', ['app:ts'], function () {
  return gulp.src(temporaryJavaScriptFilesGlob)
    .pipe(reusableTasks.plumberTask())
    .pipe(lp.ngAnnotate(npm.ngAnnotate))
    .pipe(gulp.dest(temporaryFilesPath));
});

/*
 BUILD HTML AND JADE TEMPLATES INTO ANGULAR MODULE
 */
gulp.task("clean:templates", function (done) {
  var temporaryJavaScriptTemplateFileUri = path.join(temporaryFilesPath, temporaryJavaScriptTemplateFileName);

  helper.clean(temporaryJavaScriptTemplateFileUri, done);
});

gulp.task('app:templates', ['clean:templates'], function () {

  var src = path.join(client.src.js.root, "**/*");

  var htmlFilter = lp.filter(filters.html);
  var jadeFilter = lp.filter(filters.jade);

  return gulp.src(src)
    .pipe(reusableTasks.plumberTask())
    .pipe(htmlFilter)
    .pipe(reusableTasks.angularTemplateCacheTask())
    .pipe(htmlFilter.restore())
    .pipe(jadeFilter) // No restore required - if you restore, all hell breaks loose
    .pipe(lp.jade(npm.jade))
    .pipe(reusableTasks.angularTemplateCacheTask())
    .pipe(lp.concat(temporaryJavaScriptTemplateFileName))
    .pipe(gulp.dest(temporaryFilesPath));
});

// Combines and possibly uglifies temporary JavaScript build files
gulp.task('app:combine', function () {
  return gulp.src(temporaryJavaScriptFilesGlob)
    .pipe(reusableTasks.jsTaskFn(client.src.js.outputFileName)())
    .pipe(gulp.dest(publicPaths.js))
    .pipe(reusableTasks.livereloadTask());
});

// Test
gulp.task("app:test", function (done) {
  var server = new Server({
    configFile: path.join(__dirname, client.test.karma.config)
  }, function(){
    helper.log("Karma server exited");
    done();
  });

  server.on("browser_error", function (browser, error) {
    helper.log(error);
  });

  server.on("browser_complete", function (browser, results) {

    // TODO: This isn't working
    helper.log("results---->");

    helper.log(results);

  });

  server.start();
});

// entry point for the build, using run-sequence to ensure build:test runs after the rest of the build has finished
gulp.task("app", function (done) {
  var completionCallback = function() {
    helper.log(packageJson.name + " build completed", true);
    done();
  };

  if (args.test) {
    runSequence(
      ['app:js', 'app:templates'],
      "app:combine",
      "app:test",
      completionCallback);
  } else {
    runSequence(
      ['app:js', 'app:templates'],
      "app:combine",
      completionCallback);
  }
});








