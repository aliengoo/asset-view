var gulp = require('gulp');

var args = require('yargs').argv;
var lp = require('gulp-load-plugins')({
  lazy: true
});

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
  if (commonConfig.watchReloadEnabled) {

    helper.log("Watching for changes, and ready to reload...");

    lp.livereload.listen({
      start: true
    });

    gulp.watch(commonConfig.src.glob, ['build']);
    gulp.watch(commonConfig.styles.glob, ['styles']);
  } else {

    if (!args.production) {
      helper.log("Not watching for changes.  To enable watching and reloading, use the --watch argument");
    } else {
      helper.log("Running in production mode");
    }
  }

  if (args.servePort) {
    helper.log("Running web server on port " + args.servePort);
  } else {
    helper.log("Running web server on default port " + commonConfig.servePort);
  }

  if (commonConfig.serve) {
    gulp.start("webserver");
  } else {
    helper.log("To start a web server, use the --serve argument");
  }
});




