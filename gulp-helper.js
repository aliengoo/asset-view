"use strict";

var args = require('yargs').argv;
var lp = require('gulp-load-plugins')({
  lazy: true
});

var commonConfig = require("./gulp-common-config");

var lazypipe = require("lazypipe");

var del = require('del');


/*
 -------------- REUSABLE PIPE OPERATIONS --------------
 */

var printTask = lazypipe()
  .pipe(function () {
    return lp.if(args.verbose, lp.print())
  });

// prefixes CSS properties
var autoprefixerTask = lazypipe()
  .pipe(printTask)
  .pipe(lp.plumber)
  .pipe(function () {
    return lp.autoprefixer(commonConfig.npmConfig.autoprefixer);
  });

// locates and fixes locations of fonts
var fixFontLocationTask = lazypipe()
  .pipe(function () {
    return lp.if(commonConfig.fontLocation, lp.replace(commonConfig.fontLocation.find, commonConfig.fontLocation.replaceWith));
  });

// concatenates and uglify
var jsTaskFn = function (outputFileName) {
  return lazypipe()
    .pipe(printTask)
    .pipe(function () {
      return lp.concat(outputFileName);
    })
    .pipe(function () {
      return lp.if(args.production, lp.sourcemaps.init());
    })
    .pipe(function () {
      return lp.if(args.production, lp.uglify(commonConfig.npmConfig.ugilfy));
    })
    .pipe(function () {
      return lp.if(args.production, lp.sourcemaps.write());
    });
};

// concatenates and minifies CSS
var cssTaskFn = function (concatenatedFileName) {
  return lazypipe()
    .pipe(function () {
      return commonConfig.filters.include.css;
    })
    .pipe(function () {
      return lp.concat(concatenatedFileName);
    })
    .pipe(fixFontLocationTask)
    .pipe(lp.minifyCss);
};

var sassTask = lazypipe()
  .pipe(function () {
    return commonConfig.filters.include.scss;
  })
  .pipe(function () {
    return lp.sass(commonConfig.npmConfig.sass);
  })
  .pipe(autoprefixerTask);

var lessTask = lazypipe()
  .pipe(function () {
    return commonConfig.filters.include.less;
  })
  .pipe(function () {
    return lp.less(commonConfig.npmConfig.less);
  })
  .pipe(autoprefixerTask);

var livereloadTask = lazypipe()
  .pipe(function () {
    return lp.if(commonConfig.watchReloadEnabled, lp.livereload());
  });

var angularTemplateCacheTask = lazypipe()
  .pipe(printTask)
  .pipe(function () {
    return lp.angularTemplatecache(commonConfig.npmConfig.angularTemplateCache)
  });

module.exports.printTask = printTask;
module.exports.autoprefixerTask = autoprefixerTask;
module.exports.fixFontLocationTask = fixFontLocationTask;
module.exports.jsTaskFn = jsTaskFn;
module.exports.cssTaskFn = cssTaskFn;
module.exports.lessTask = lessTask;
module.exports.sassTask = sassTask;
module.exports.livereloadTask = livereloadTask;
module.exports.angularTemplateCacheTask = angularTemplateCacheTask;


/*
 -------------- HELPFUL FUNCTIONS --------------
 */

module.exports.clean = clean;
module.exports.log = log;

/**
 * Cleans the path
 * @param path
 * @param done
 */
function clean(path, done) {
  log("Cleaning: " + path);

  del(path, done);
}

/**
 * Writes a log message
 * @param message - the message
 */
function log(message) {
  var printFn = lp.util.colors.magenta.bold;

  if (typeof (message) === "object") {
    for (var item in message) {
      if (message.hasOwnProperty(item)) {
        lp.util.log(printFn(message[item]));
      }
    }
  } else {
    lp.util.log(printFn(message));
  }
}

function verbose() {
  return lp.if(args.verbose, lp.print())
}
