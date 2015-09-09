var path = require("path");

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

module.exports = publicPaths;