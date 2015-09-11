"use strict";

var lp = require("gulp-load-plugins")({
  lazy: true
});

var lazypipe = require("lazypipe");

var client = require("../package.json").workflow.client;

var args = require("./gulp-config.command-line-args");
var npm = require("./gulp-config.npm");
var filters = require("./gulp-config.filters");

/*
 -------------- REUSABLE PIPE OPERATIONS --------------
 */

var plumberTask = lazypipe().pipe(function () {
  return lp.plumber(npm.plumber);
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
    return lp.autoprefixer(npm.autoprefixer);
  });

// locates and fixes locations of fonts
var replaceFn = function(replaceThis, withThat){
    return lazypipe()
      .pipe(function () {
        return lp.replace(replaceThis, withThat);
      });
};

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
      return lp.if(args.production, lp.uglify(npm.ugilfy));
    })
    .pipe(function () {
      return lp.if(args.production, lp.sourcemaps.write());
    });
};

// concatenates and minifies CSS
var cssTaskFn = function (concatenatedFileName) {

  var cssFilter = lp.filter(filters.css);
  return lazypipe()
    .pipe(plumberTask)
    .pipe(function () {
      return cssFilter;
    })
    .pipe(function () {
      return lp.concat(concatenatedFileName);
    })
    .pipe(function(){
      return lp.if(client.fontLocation, replaceFn(client.fontLocation.find, client.fontLocation.replaceWith)());
    })
    .pipe(lp.minifyCss);
};

var sassTaskFn = function () {

  var scssFilter = lp.filter(filters.scss);

  return lazypipe()
    .pipe(plumberTask)
    .pipe(function () {
      return scssFilter;
    })
    .pipe(function () {
      return lp.sass(npm.sass);
    })
    .pipe(autoprefixerTask);
};

var lessTaskFn = function () {

  var lessFilter = lp.filter(filters.less);

  return lazypipe()
    .pipe(plumberTask)
    .pipe(function () {
      return lessFilter;
    })
    .pipe(function () {
      return lp.less(npm.less);
    })
    .pipe(autoprefixerTask);

};

var livereloadTask = lazypipe()
  .pipe(function () {
    return lp.if(args.watchReloadEnabled, lp.livereload());
  });

var angularTemplateCacheTask = lazypipe()
  .pipe(printTask)
  .pipe(plumberTask)
  .pipe(function () {
    return lp.angularTemplatecache(npm.angularTemplateCache)
  });

// lazypipe functions should be called like this
// .pipe(plumberTask())
module.exports.plumberTask = plumberTask;
module.exports.printTask = printTask;
module.exports.autoprefixerTask = autoprefixerTask;
module.exports.replaceFn = replaceFn;
module.exports.livereloadTask = livereloadTask;
module.exports.angularTemplateCacheTask = angularTemplateCacheTask;

// functions should be called like this
// .pipe(jsTaskFunc("filename.js")())
module.exports.jsTaskFn = jsTaskFn;
module.exports.cssTaskFn = cssTaskFn;
module.exports.lessTaskFn = lessTaskFn;
module.exports.sassTaskFn = sassTaskFn;
