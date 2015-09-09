// Set global NPM library configuration here

var client = require("../package.json").workflow.client;
var helper = require("./gulp-build.helper");
var args = require("./gulp-config.command-line-args");

module.exports = {
  angularTemplateCache: {
    module: client.angular.templates.module,
    standalone: true
  },

  // https://www.npmjs.com/package/gulp-autoprefixer
  autoprefixer: {
    browsers: ["last 2 version", "> 5%"]
  },

  // https://www.npmjs.com/package/gulp-jade
  jade: {},

  // https://www.npmjs.com/package/gulp-less
  less: undefined,

  // https://github.com/ck86/main-bower-files
  mainBowerFiles: {
    debugging: args.verbose
  },

  // https://www.npmjs.com/package/gulp-ng-annotate
  ngAnnotate: {},

  //https://www.npmjs.com/package/gulp-plumber
  plumber: {
    errorHandler: function (error) {
      helper.log(error, false, true);

      helper.notify(error.toString(), "Plumber Error", "error");
    }
  },

  // https://www.npmjs.com/package/gulp-print
  print: {},

  // https://www.npmjs.com/package/gulp-sass
  sass: {},

  // https://www.npmjs.com/package/gulp-uglify
  ugilfy: {
    mangle: false
  }
};