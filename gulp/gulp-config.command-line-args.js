var args = require("yargs").argv;

var packageJson = require("../package.json");

var deploy = !!args.deploy;
var hostname, remotePath;

if (deploy) {
  hostname = args.hostname || packageJson.workflow.client.deploy.hostname;

  if (!hostname || !packageJson.workflow.client.deploy.remotePath) {
    throw new Error("You want to deploy, but you didn't tell the hostname or the remotePath (see package.json)");
  }
}



module.exports = {

  // starts a web server
  serve: !!args.serve && !(!!args.production),

  // You have a server-side components, and that's what serving the content
  nodemon: !!args.nodemon,

  servePort: args.servePort || 8000,

  // runs karma test
  test: !!args.test && !(!!args.production),

  // when watch is enabled and not in production, run livereload
  watchReloadEnabled: !!args.watch && !(!!args.production),

  production: !!args.production,

  verbose: !!args.verbose,

  deploy: deploy,

  hostname: hostname,

  remotePath: packageJson.workflow.client.deploy.remotePath,

  user: packageJson.workflow.client.deploy.user,

  fakeBackend: !!args.fakeBackend
};