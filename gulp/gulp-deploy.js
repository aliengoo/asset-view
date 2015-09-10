"use strict";

var gulp = require("gulp");
var path = require("path");
var lp = require("gulp-load-plugins")({
  lazy: true
});

var args = require("./gulp-config.command-line-args");
var publicPaths = require("./gulp-config.public-paths");
var reusableTasks = require("./gulp-build.reusable-tasks");
var helper = require("./gulp-build.helper");
var client = require("../package.json").workflow.client;

var deploymentOptions = {
    remotePath: args.remotePath,
    host: args.hostname,
    user: args.user
};

// TODO: Simplify deployments...

gulp.task("deploy:all", function () {

  // requires SSH authentication to work
  helper.log("Deploying to " + args.hostname);

  var src = path.join(__dirname, "../", publicPaths.glob);

  helper.log("Uploading: " + src + " to " + args.remotePath);

  return gulp.src(src)
    .pipe(reusableTasks.printTask())
    .pipe(reusableTasks.plumberTask())
    .pipe(lp.sftp(deploymentOptions));
});


gulp.task("deploy:src", function () {

  // requires SSH authentication to work
  helper.log("Deploying to " + args.hostname);

  var src = path.join(__dirname, "../", publicPaths.js, client.src.js.outputFileName);

  helper.log("Uploading: " + src + " to " + args.remotePath);

  return gulp.src(src)
    .pipe(reusableTasks.printTask())
    .pipe(reusableTasks.plumberTask())
    .pipe(lp.sftp(deploymentOptions));
});

gulp.task("deploy:styles", function () {

  // requires SSH authentication to work
  helper.log("Deploying styles to " + args.hostname);

  var src = path.join(__dirname, "../", publicPaths.css, client.src.css.outputFileName);

  helper.log("Uploading: " + src + " to " + args.remotePath);

  return gulp.src(src)
    .pipe(reusableTasks.printTask())
    .pipe(reusableTasks.plumberTask())
    .pipe(lp.sftp(deploymentOptions));
});


