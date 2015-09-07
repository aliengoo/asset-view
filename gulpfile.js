var gulp = require('gulp');
var lp = require('gulp-load-plugins')({
  lazy: true
});
var config = require('./gulp.config')();
var args = require('yargs').argv;
var del = require('del');
var fs = require('fs');
var path = require('path');

var bowerFiles = require('main-bower-files');

var mainBowerFilesOptions = {};

if (args.verbose) {
  mainBowerFilesOptions.debugging = true;
}

// if watch is set, and we're not running in production mode.
var watchReloadEnabled = !!args.watch && !(!!args.production);

// clean your builds
gulp.task("clean:appjs", function (done) {
  clean(path.join(config.temp, "app.js"), done);
});

gulp.task("clean:templatesjs", function (done) {
  clean(path.join(config.temp, "templates.js"), done);
});

// Clean styles from temporary directory
gulp.task("clean:app-styles", function (done) {
  clean(config.tempAppStyles + "/*.css", done);
});

gulp.task("clean:vendor-styles", function (done) {
  clean(config.tempVendorStyles + "/*.css", done);
});

// build styles from SCSS files, then autoprefix, finally livereload
gulp.task("styles", ["clean:app-styles"], function () {

  log("Compiling sass, and autoprefixing...");

  return lp.rubySass(config.sass)
    .pipe(lp.if(args.verbose, lp.print()))
    .pipe(lp.plumber())
    .pipe(lp.autoprefixer({browsers: ["last 2 version", "> 5%"]}))
    .pipe(gulp.dest(config.client.assetsFolder))
    .pipe(lp.if(watchReloadEnabled, lp.livereload()));
});

gulp.task('build', ['build:js', 'build:templates'], function () {
  log("Preparing final application JavaScript file...");

  return gulp.src(path.join(config.temp, '*.js'))
    .pipe(lp.if(args.verbose, lp.print()))
    .pipe(lp.concat(config.client.appJsFile))
    .pipe(lp.if(args.production, lp.sourcemaps.init()))
    .pipe(lp.if(args.production, lp.uglify({
      mangle: false
    })))
    .pipe(lp.if(args.production, lp.sourcemaps.write()))
    .pipe(gulp.dest(config.client.jsFolder))
    .pipe(lp.if(watchReloadEnabled, lp.livereload()));
});

gulp.task('build:ts', ['clean:appjs'], function () {

  // builds the typescript files and plonks them into temp
  var tsResult = gulp.src('app/**/*.ts')
    .pipe(lp.typescript({
      noImplicitAny: true,
      out: 'app.js'
    }));

  return tsResult.js.pipe(gulp.dest(config.temp));
});

gulp.task('build:js', ['build:ts'], function () {
  return gulp.src(path.join(config.temp, 'app.js'))
    .pipe(lp.ngAnnotate())
    .pipe(gulp.dest(config.temp));
});

gulp.task('build:templates', ['clean:templatesjs'], function () {
  // converts jade files into regular html files, the compiles them into the template cache

  var htmlFilter = lp.filter(config.mainBowerFilterFilters.html);
  var jadeFilter = lp.filter(config.mainBowerFilterFilters.jade);

  return gulp.src('./app/**/*')
    .pipe(lp.plumber())
    .pipe(htmlFilter)
    .pipe(lp.if(args.verbose, lp.print()))
    .pipe(lp.angularTemplatecache({
      module: config.templatesModule,
      standalone: true
    }))
    .pipe(htmlFilter.restore())
    .pipe(jadeFilter)
    .pipe(lp.if(args.verbose, lp.print()))
    .pipe(lp.jade())
    .pipe(lp.angularTemplatecache({
      module: config.templatesModule,
      standalone: true
    }))
    .pipe(lp.concat('templates.js'))
    .pipe(gulp.dest(config.temp));
});

// compiles js files into vendor.js based on {package}/bower.json/main property
gulp.task("bower:js", function () {
  var jsFilter = lp.filter(config.mainBowerFilterFilters.js);

  return gulp.src(bowerFiles(mainBowerFilesOptions))
    .pipe(lp.addSrc(config.additionalVendorFiles))
    .pipe(jsFilter)
    .pipe(lp.if(args.verbose, lp.print()))
    .pipe(lp.concat(config.client.vendorJsFile))
    .pipe(lp.if(args.production, lp.uglify(config.uglify)))
    .pipe(gulp.dest(config.client.jsFolder));
});

gulp.task("bower:less", function () {
  var lessFilter = lp.filter(config.mainBowerFilterFilters.less);

  return gulp.src(bowerFiles(mainBowerFilesOptions))
    .pipe(lessFilter)
    .pipe(lp.less())
    .pipe(gulp.dest(path.join(config.tempVendorStyles)));
});

// Compiles bower CSS dependencies
gulp.task("bower:css", ["bower:less"], function () {
  var cssFilter = lp.filter(config.mainBowerFilterFilters.css);

  return gulp.src(bowerFiles(mainBowerFilesOptions))
    .pipe(lp.addSrc(config.additionalVendorFiles))
    .pipe(lp.addSrc(config.tempVendorStyles + "/*.css"))
    .pipe(cssFilter)
    .pipe(lp.concat(config.client.vendorCssFile))
    .pipe(lp.if(config.fontLocation, lp.replace(config.fontLocation.find, config.fontLocation.replaceWith)))
    .pipe(lp.minifyCss())
    .pipe(gulp.dest(config.client.assetsFolder));
});


// move any other files that are not JS or CSS into the assets folder
// TODO: To include or exclude files, change config.mainBowerFilterFilters.assets glob
gulp.task("bower:assets", function () {
  var assetsFilter = lp.filter(config.mainBowerFilterFilters.assets);

  return gulp.src(bowerFiles(mainBowerFilesOptions))
    .pipe(lp.addSrc(config.additionalVendorFiles))
    .pipe(assetsFilter)
    .pipe(gulp.dest(config.client.assetsFolder));
});

// Runs all bower tasks
gulp.task("bower", ["bower:js", "bower:css", "bower:assets"], function (done) {
  done();
  log("bower completed");
});

gulp.task('webserver', function () {
  gulp.src('public').pipe(lp.webserver({
    fallback: 'index.html'
  }));
});


gulp.task('default', ['styles', 'bower', 'build'], function () {
  if (watchReloadEnabled) {

    log("Watching for changes, and ready to reload...");

    lp.livereload.listen({
      start: true
    });

    gulp.watch('app/**/*', ['build']);
    gulp.watch('styles/**/*', ['styles']);
  } else {

    if (!args.production) {
      log("Not watching for changes.  To enable watching and reloading, use the --watch argument");
    } else {
      log("Running in production mode");
    }
  }
});

function clean(path, done) {
  log("Cleaning: " + path);

  del(path, done);
}

// logs a message
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




