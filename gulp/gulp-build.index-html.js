"use strict";

var gulp = require("gulp");
var rename = require("gulp-rename");
var template = require("gulp-template");
var path = require("path");

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
    appJsFileUri: pathify(publicPaths.js, client.src.js.outputFileName)
  };

  return gulp.src(client.src.index.templateFileUri)
    .pipe(template(data))
    .pipe(rename("index.html"))
    .pipe(gulp.dest(publicPaths.root));

});
