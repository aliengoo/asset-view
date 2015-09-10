"use strict";

var lp = require('gulp-load-plugins')({
  lazy: true
});

var notifier = require("node-notifier");
var path = require("path");

var packageJson = require("../package.json");
var args = require("./gulp-config.command-line-args");
var lazypipe = require("lazypipe");
var del = require('del');
var _ = require("lodash");

/*
 -------------- HELPFUL FUNCTIONS --------------
 */

module.exports.clean = clean;
module.exports.log = log;
module.exports.notify = notify;

/**
 * Cleans the path
 * @param path
 * @param done
 */
function clean(path, done) {
  del(path, done);
}

/**
 *
 * @param message
 * @param notifyExternal
 * @param isError
 */
function log(message, notifyExternal, isError) {
  var printFn = lp.util.colors.cyan.bold;

  if (typeof (message) === "object") {
    for (var item in message) {
      if (message.hasOwnProperty(item)) {
        lp.util.log(printFn(message[item]));
      }
    }
  } else {
    lp.util.log(printFn(message));

    if (notifyExternal) {
      notify(message, packageJson.name, isError ? "error" : "success");
    }
  }
}

function notify(message, title, type) {

  if (!_.isString(message)) {
    throw new TypeError("notify: message argument was not a string");
  }

  var options = {
    message: message
  };

  if (title && !_.isString(title)) {
    throw new TypeError("notify: title argument was not a string");
  } else {
    options.title = title;
  }

  if (type && !_.isString(type)) {
    throw new TypeError("notify: type argument was not a string");
  }

  var root = path.join(__dirname, "/notification-images");

  var notifyImageMap = {
    error: path.join(root, "error.png"),
    success: path.join(root, "success.png"),
    failed: path.join(root, "failed.png")
  };

  var keys = Object.keys(notifyImageMap);

  if (type && keys.indexOf(type) < 0) {
    throw new Error("notify: type argument must be one of these -> " + keys.join(", "))
  } else {
    options.icon = notifyImageMap[type];
  }

  notifier.notify(options);
}