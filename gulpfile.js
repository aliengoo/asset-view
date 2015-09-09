var gulp = require('gulp');

var lp = require('gulp-load-plugins')({
  lazy: true
});

var path = require("path");

var indexHtml = require("./gulp/gulp-build.index-html");
var args = require("./gulp/gulp-config.command-line-args");
var app = require("./gulp/gulp-build.app");
var vendor = require("./gulp/gulp-build.vendor");
var helper = require("./gulp/gulp-build.helper");
var serve = require("./gulp/gulp-serve");

var client = require("./package.json").workflow.client;

var glob = "**/*";

gulp.task('default', ['index-html', 'app:styles', 'app', 'vendor'], function () {

  if (!args.production) {
    // web server
    if (args.serve) {
      gulp.start("serve");
    }

    // testing
    if (args.test) {
      helper.log("Karma tests enabled");
    } else {
      helper.log("To run karma tests, use the --test argument");
    }

    // watch
    if (args.watchReloadEnabled) {

      lp.livereload.listen({
        start: true
      });

      gulp.watch(path.join(client.src.js.root, glob), ['app']);
      gulp.watch(path.join(client.src.styles.root, glob), ['app:styles']);
      gulp.watch(path.join(client.test.root, glob), ['app:test']);

      helper.log("Watching for changes, and ready to reload...");
      helper.log("READY PLAYER ONE...");
    } else {
      helper.log("Not watching for changes.  To enable watching and reloading, use the --watch argument");
    }

  } else {
    helper.log("Running in production mode");
  }
});




