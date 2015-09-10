var args = require("yargs").argv;

var packageJson = require("../package.json");

var deploy = !!args.deploy;
var hostname, destination;

if (deploy) {
  hostname = args.hostname || packageJson.workflow.client.deploy.hostname;
  destination = args.destination || packageJson.workflow.client.deploy.destination;

  if (!hostname || !destination) {
    throw new Error("You want to deploy, but you didn't tell the hostname or destination");
  }
}


module.exports = {
  // starts a web server
  serve: !!args.serve && !(!!args.production),

  servePort: args.servePort || 8000,

  // runs karma test
  test: !!args.test && !(!!args.production),

  // when watch is enabled and not in production, run livereload
  watchReloadEnabled: !!args.watch && !(!!args.production),

  production: !!args.production,

  verbose: !!args.verbose,

  deploy: deploy,

  hostname: hostname,

  destination: destination
};