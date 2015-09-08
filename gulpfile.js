var gulp = require('gulp');

var args = require('yargs').argv;
var lp = require('gulp-load-plugins')({
  lazy: true
});

var path = require("path");

var commonConfig = require("./gulp-common-config");
var app = require("./gulp-app");
var bower = require("./gulp-bower");
var helper = require("./gulp-helper");

gulp.task('webserver', function () {
  gulp.src('public').pipe(lp.webserver({
    fallback: 'index.html',
    port: commonConfig.servePort
  }));
});

gulp.task('default', ['styles', 'build', 'bower'], function () {

  if (!args.production) {
    // web server
    if (commonConfig.serve) {
      if (args.servePort) {
        helper.log("Running web server on port " + args.servePort);
      } else {
        helper.log("Running web server on default port " + commonConfig.servePort);
      }

      gulp.start("webserver");
    } else {
      helper.log("To start a web server, use the --serve argument");
    }

    // testing
    if (commonConfig.test) {
      helper.log("Karma tests enabled");
    } else {
      helper.log("To run karma tests, use the --test argument");
    }

    // watch
    if (commonConfig.watchReloadEnabled) {

      lp.livereload.listen({
        start: true
      });

      gulp.watch(commonConfig.src.glob, ['build']);
      gulp.watch(commonConfig.styles.glob, ['styles']);
      gulp.watch(commonConfig.karma.glob, ['build:test']);

      helper.log("Watching for changes, and ready to reload...");
      helper.log("READY PLAYER ONE...");
    } else {
      helper.log("Not watching for changes.  To enable watching and reloading, use the --watch argument");
    }

  } else {
    helper.log("Running in production mode");
  }


});




