"use strict";

var lp = require('gulp-load-plugins')({
  lazy: true
});

var del = require('del');

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
