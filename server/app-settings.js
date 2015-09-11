"use strict";

var accessControlAllowMethods = ['GET', 'POST', 'PUT', 'DELETE'];



if (!process.env.hasOwnProperty("MONGODB_URL_ASSET_VIEW")) {
  throw new Error("MONGODB_URL_ASSET_VIEW environment variable has not been set")
}

var databaseUrl = process.env["MONGODB_URL_ASSET_VIEW"];


var appSettings = {
  local: {
    internalBlockAddress: "",
    databaseUrl: "mongodb://localhost/asset-view",
    port: 4000,
    cacheEnabled: true,
    corsOptions: {
      origin: "http://localhost:4000",
      methods: accessControlAllowMethods
    }
  },
  development: {
    databaseUrl: databaseUrl,
    port: 4000,
    cacheEnabled: false,
    corsOptions: {
      origin: "https://hqnodejs41d",
      methods: accessControlAllowMethods
    }
  },
  test: {
    databaseUrl: databaseUrl,
    port: 80,
    cacheEnabled: false,
    corsOptions: {
      origin: "https://hqnodejs41t",
      methods: accessControlAllowMethods
    }
  },
  master: {
    databaseUrl: databaseUrl,
    port: 80,
    cacheEnabled: true,
    corsOptions: {
      origin: "https://hqnodejs41p",
      methods: accessControlAllowMethods
    }
  }
};


module.exports = function () {
  return appSettings[process.env.NODE_ENV] || appSettings.local;
};
