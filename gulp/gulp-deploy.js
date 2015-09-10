"use strict";

var gulp = require("gulp");
var sftp = require("gulp-sftp");
var path = require("path");

var args = require("./gulp-config.command-line-args");
var publicPaths = require("./gulp-config.public-paths");
var reusableTasks = require("./gulp-build.reusable-tasks");
var helper = require("./gulp-build.helper");

gulp.task("deploy", function (done) {

  if (args.deploy) {

    // requires SSH authentication to work
    helper.log("Deploying to " + args.hostname);

    var options = {
      remotePath: args.remotePath,
      host: args.hostname,
      user: "siteadmin"
    };

    var src = path.join(__dirname, "../", publicPaths.glob);

    helper.log("Uploading: " + src + " to " + args.destination);

    gulp.src(src)
      .pipe(reusableTasks.printTask())
      .pipe(reusableTasks.plumberTask())
      .pipe(sftp(options))
      .on("end", done);

  } else {
    done();
  }
});


