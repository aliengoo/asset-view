var args = require("yargs").argv;

module.exports = {
  // starts a web server
  serve: !!args.serve && !(!!args.production),

  servePort: args.servePort || 8000,

  // runs karma test
  test: !!args.test && !(!!args.production),

  // when watch is enabled and not in production, run livereload
  watchReloadEnabled: !!args.watch && !(!!args.production),

  production: !!args.production,

  verbose: !!args.verbose
};