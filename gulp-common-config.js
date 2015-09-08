"use strict";

var path = require("path");
var args = require("yargs").argv;
var lp = require("gulp-load-plugins")({
    lazy: true
  }
);

var notifier = require("node-notifier");
var fs = require("fs");

/*
 ------------------ TEMPLATE MODULE PATH CONFIGURATION ------------------
 */
var angularTemplateCacheModuleName = "atd.templates";

/*
 ------------------ SOURCE PATH CONFIGURATION ------------------
 */
var src = {
  root: "app"
};

src.glob = path.join(src.root, "**/*");

/*
 ------------------ STYLE PATH CONFIGURATION ------------------
 */
var styles = {
  root: "styles"
};

styles.glob = path.join(styles.root, "**/*");

/*
 ------------------ TEST PATH CONFIGURATION ------------------
 */
var karma = {
  root: "test"
};

karma.glob = path.join(karma.root, "**/*spec.js");


/*
 ------------------ PUBLIC PATHS CONFIGURATION ------------------
 */
var publicPaths = {
  root: "public"
};

// JavaScript source
publicPaths.js = path.join(publicPaths.root, "js");

// images, fonts, etc
publicPaths.assets = path.join(publicPaths.root, "assets");

// css gets plonked in the same location as the assets
publicPaths.css = publicPaths.assets;

/*
 ------------------ CONFIGURATION EXPORTED ------------------
 */

module.exports = {
  src: src,
  styles: styles,
  karma: karma,

  // starts a web server
  serve: !!args.serve && !(!!args.production),

  servePort: args.servePort || 8000,

  // runs karma test
  test: !!args.test && !(!!args.production),

  // when watch is enabled and not in production, run livereload
  watchReloadEnabled: !!args.watch && !(!!args.production),

  // temporary build location
  temporaryPath: ".temp",

  // where the browser can reach them
  publicPaths: publicPaths,

  // sometimes the font locations in CSS output are where they should be, use this configuration along with
  // the gulp-helper->autoprefixerTask to correct that.
  fontLocation: {
    find: "../fonts/",
    replaceWith: "./"
  },

  // Set global NPM library configuration here
  npmConfig: {
    angularTemplateCache: {
      module: angularTemplateCacheModuleName,
      standalone: true
    },

    // https://www.npmjs.com/package/gulp-autoprefixer
    autoprefixer: {
      browsers: ["last 2 version", "> 5%"]
    },

    // https://www.npmjs.com/package/gulp-jade
    jade: {},

    karma: {
      configFile: "test/test.conf.js",
      action: "run"
    },

    // https://www.npmjs.com/package/gulp-less
    less: undefined,

    // https://github.com/ck86/main-bower-files
    mainBowerFiles: {
      debugging: args.hasOwnProperty("verbose")
    },

    // https://www.npmjs.com/package/gulp-ng-annotate
    ngAnnotate: {},

    //https://www.npmjs.com/package/gulp-plumber
    plumber: {
      errorHandler: function(error){
        notifier.notify({
          icon:  __dirname + "/img/error.png",
          title: "ERROR",
          message: error
        });
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
  },

  // GLOB files
  filters: {
    include: {
      js: ["**/*.js"],
      html: ["**/*.html"],
      jade: ["**/*.jade"],
      css: ["**/*.css"],
      less: ["**/*.less"],
      scss: ["**/*.scss"],
      assets: [
        '*',
        '!**/*.css',
        '!**/*.js',
        '!**/*.jade',
        '!**/*.scss',
        '!**/*.less']
    }
  }
};

