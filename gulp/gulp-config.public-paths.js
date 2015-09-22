var path = require("path");

/*
 ------------------ PUBLIC PATHS CONFIGURATION ------------------
 */

// Where it gets publicly exposed

var publicPaths = {
  root: "wwwroot"
};

// JavaScript source
publicPaths.js = path.join(publicPaths.root, "js");

// images, fonts, etc
publicPaths.assets = path.join(publicPaths.root, "assets");

// css gets plonked in the same location as the assets
publicPaths.css = publicPaths.assets;

publicPaths.glob = path.join(publicPaths.root, "**/*");

module.exports = publicPaths;