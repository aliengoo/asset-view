var gulp = require('gulp');

var os = require("os");

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
var deploy = require("./gulp/gulp-deploy");
var nodemon = require("./gulp/gulp-nodemon");
var format = require("util").format;



var publicPaths = require("./gulp/gulp-config.public-paths");

var client = require("./package.json").workflow.client;

var glob = "**/*";

helper.log(format("Running on %s v%s", os.platform(), os.release()));

gulp.task('default', ['index-html', 'app:styles', 'app', 'vendor'], function () {

  if (!args.production) {
    // web server
    if (args.serve) {
      gulp.start("serve");
    }

    if (args.nodemon) {
      gulp.start("nodemon");
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
      if (args.test) {
        helper.log("Not watching for your changes, but I am watching for test changes.  To enable watching and reloading, use the --watch argument");
      } else {
        helper.log("Not watching for your changes.  To enable watching and reloading, use the --watch argument");
      }

    }

  } else {
    helper.log("Running in production mode");
  }
});




