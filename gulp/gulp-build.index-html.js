"use strict";

var format = require("util").format;
var gulp = require("gulp");
var rename = require("gulp-rename");
var template = require("gulp-template");
var path = require("path");
var ip = require("ip");
var args = require("./gulp-config.command-line-args");

var client = require("../package.json").workflow.client;
var publicPaths = require("./gulp-config.public-paths");

function pathify(parentDir, fileName) {
  return path.join(parentDir.replace(publicPaths.root, ""), fileName).substr(1).replace("\\", "/");
}

gulp.task("index-html", function () {

  var data = {
    mainModule: client.angular.mainModule,
    vendorCssFileUri: pathify(publicPaths.css, client.vendor.src.styles.outputFileName),
    vendorJsFileUri: pathify(publicPaths.js, client.vendor.src.js.outputFileName),
    appCssFileUri: pathify(publicPaths.css, client.src.styles.outputFileName),
    appJsFileUri: pathify(publicPaths.js, client.src.js.outputFileName),
    livereload: "<!-- livereload not enabled -->"
  };

  if (args.watchReloadEnabled) {
    data.livereload = format('<script src="http://%s:35729/livereload.js?snipver=1"></script>', ip.address());
  }

  return gulp.src(client.src.index.templateFileUri)
    .pipe(template(data))
    .pipe(rename("index.html"))
    .pipe(gulp.dest(publicPaths.root));

});
