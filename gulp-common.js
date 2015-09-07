"use strict";

var path = require("path");

var common = {
  // temporary build location
  temporaryPath: ".temp",

  // where the browser can reach
  clientPath: {
    root: "public"
  },

  npmConfig: {
    // https://www.npmjs.com/package/gulp-autoprefixer
    autoprefixer: {browsers: ["last 2 version", "> 5%"]},

    // https://www.npmjs.com/package/gulp-uglify
    ugilfy: undefined,

    // https://www.npmjs.com/package/gulp-less
    less: undefined
  },

  // GLOB files
  filters: {
    include: {
      js: ["**/*.js"],
      html: ["**/*.html"],
      jade: ["**/*.jade"],
      css: ["**/*.css"],
      less: ["**/*.less"],
      scss: ["**/*.scss"]
    },
    exclude: {
      js: [ "!**/*.js"],
      html: ["!**/*.html"],
      jade: ["!**/*.jade"],
      css: ["!**/*.css"],
      less: ["!**/*.less"],
      scss: ["!**/*.scss"]
    }
  }
};

common.clientPath.js = path.join(common.clientPath.root, "js");
common.clientPath.css = path.join(common.clientPath.root, "assets");

module.exports = common;
