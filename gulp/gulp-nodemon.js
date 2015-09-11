"use strict";

var gulp = require("gulp");
var lp = require("gulp-load-plugins")({
  lazy: true
});

var helper = require("./gulp-build.helper");

gulp.task("nodemon", function () {
  return lp.nodemon().on("error", function(error) {
    helper.log(error, false, true);
  });
});
