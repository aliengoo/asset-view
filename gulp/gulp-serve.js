var gulp = require("gulp");
var lp = require("gulp-load-plugins")({
  lazy: true
});

var helper = require("./gulp-build.helper");
var serve = require("../package.json").workflow.client.serve;

gulp.task('serve', function () {

  helper.log("Running web server on port " + serve.port);

  return gulp.src('public').pipe(lp.webserver({
    fallback: 'index.html',
    port: serve.port
  }));
});
