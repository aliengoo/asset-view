"use strict";

var args = require('yargs').argv;
var lp = require('gulp-load-plugins')({
  lazy: true
});

var notifier = require("node-notifier");

var packageJson = require("./package.json");

var commonConfig = require("./gulp-common-config");

var lazypipe = require("lazypipe");

var del = require('del');


/*
 -------------- REUSABLE PIPE OPERATIONS --------------
 */

var plumberTask = lazypipe().pipe(function () {
  return lp.plumber(commonConfig.npmConfig.plumber);
});


var printTask = lazypipe()
  .pipe(function () {
    return lp.if(args.verbose, lp.print())
  });

// prefixes CSS properties
var autoprefixerTask = lazypipe()
  .pipe(printTask)
  .pipe(plumberTask)
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
    .pipe(plumberTask)
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

  var cssFilter = lp.filter(commonConfig.filters.include.css);
  return lazypipe()
    .pipe(plumberTask)
    .pipe(function () {
      return cssFilter;
    })
    .pipe(function () {
      return lp.concat(concatenatedFileName);
    })
    .pipe(fixFontLocationTask)
    .pipe(lp.minifyCss);
};

var sassTaskFn = function () {

  var scssFilter = lp.filter(commonConfig.filters.include.scss);

  return lazypipe()
    .pipe(plumberTask)
    .pipe(function () {
      return scssFilter;
    })
    .pipe(function () {
      return lp.sass(commonConfig.npmConfig.sass);
    })
    .pipe(autoprefixerTask);
};

var lessTaskFn = function () {

  var lessFilter = lp.filter(commonConfig.filters.include.less);

  return lazypipe()
    .pipe(plumberTask)
    .pipe(function () {
      return lessFilter;
    })
    .pipe(function () {
      return lp.less(commonConfig.npmConfig.less);
    })
    .pipe(autoprefixerTask);

};

var livereloadTask = lazypipe()
  .pipe(function () {
    return lp.if(commonConfig.watchReloadEnabled, lp.livereload());
  });

var angularTemplateCacheTask = lazypipe()
  .pipe(printTask)
  .pipe(plumberTask)
  .pipe(function () {
    return lp.angularTemplatecache(commonConfig.npmConfig.angularTemplateCache)
  });

module.exports.plumberTask = plumberTask;
module.exports.printTask = printTask;
module.exports.autoprefixerTask = autoprefixerTask;
module.exports.fixFontLocationTask = fixFontLocationTask;
module.exports.jsTaskFn = jsTaskFn;
module.exports.cssTaskFn = cssTaskFn;
module.exports.lessTaskFn = lessTaskFn;
module.exports.sassTaskFn = sassTaskFn;
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
  del(path, done);
}

/**
 * Writes a log message
 * @param message - the message
 */
function log(message, notify, isError) {
  var printFn = lp.util.colors.cyan.bold;

  if (typeof (message) === "object") {
    for (var item in message) {
      if (message.hasOwnProperty(item)) {
        lp.util.log(printFn(message[item]));
      }
    }
  } else {
    lp.util.log(printFn(message));

    if (notify) {

      var icon = isError ? __dirname + "/img/error.png" : __dirname + "/img/success.png";
      notifier.notify({
        icon: icon,
        title: packageJson.name,
        message: message
      });
    }

  }
}

function verbose() {
  return lp.if(args.verbose, lp.print())
}
