"use strict";

var Q = require("q");
var Entity = require("./entity").Entity;
var EntityLink = require("./entity-link").EntityLink;
var format = require("util").format;

var dbInit = require("../db-init");

dbInit("mongodb://localhost/asset-view");

// ADJECTIVES


function containsEntityFn(memo) {

  var defer = Q.defer();
  // contains

  var containsEntity = new Entity({
    name: "contains",
    classification: "adjective",
    uri: "contains",
    labels: ["contains", "container"],
    description: "Container adjective entity",
    icon: "icon-box",
    meta: {}
  });

  containsEntity.save(function (err) {
    if (err) {
      memo.err = err;
      defer.reject(memo);
    } else {
      memo.containsEntity = containsEntity;
      defer.resolve(memo);
    }
  });

  return defer.promise;
}

// related

function relatedEntityFn(memo) {

  var defer = Q.defer();

  var relatedEntity = new Entity({
    name: "related",
    classification: "adjective",
    uri: "related",
    labels: ["related", "container"],
    description: "Related adjective entity",
    icon: "icon-link",
    meta: {}
  });

  relatedEntity.save(function (err) {
    if (err) {
      memo.err = err;
      defer.reject(memo);
    } else {
      memo.relatedEntity = relatedEntity;

      defer.resolve(memo);
    }
  });

  return defer.promise;
}

function hostsEntityFn(memo) {

  var defer = Q.defer();

  var hostsEntity = new Entity({
    name: "hosts",
    classification: "adjective",
    uri: "hosts",
    labels: ["hosts", "container"],
    description: "Hosts adjective entity",
    icon: "icon-link",
    meta: {}
  });

  hostsEntity.save(function (err) {
    if (err) {
      memo.err = err;
      defer.reject(memo);
    } else {
      memo.hostsEntity = hostsEntity;
      defer.resolve(memo);
    }
  });

  return defer.promise;
}


// NOUNS

//  sample data

// development environment
function developmentEnvironmentEntity(memo) {
  var defer = Q.defer();

  var developmentEnvironmentEntity = new Entity({
    name: "Development Server Environment",
    classification: "noun",
    uri: "development-server-environment",
    labels: ["development", "environment", "server", "servers"],
    description: "Development server environment",
    icon: "icon-cube",
    meta: {}
  });

  developmentEnvironmentEntity.save(function (err) {
    if (err) {
      memo.err = err;
      defer.reject(err);
    } else {
      memo.developmentEnvironmentEntity = developmentEnvironmentEntity;
      defer.resolve(memo);
    }
  });

  return defer.promise;
}

function devServerEntityFn(memo) {

  var defer = Q.defer();

  if (!memo.serverId) {
    memo.serverId = 1;
  }

  var serverName = format("hqdevserver0%sd", memo.serverId);

  var server = new Entity({
    name: serverName,
    classification: "noun",
    uri: serverName,
    labels: ["development", "server"],
    description: format("HQ development server %s", memo.serverId),
    icon: "icon-server",
    meta: {}
  });

  server.save(function (err) {

    if (err) {
      memo.err = err;
      defer.reject(memo);
    } else {

      var link = new EntityLink({
        lhs: memo.developmentEnvironmentEntity._id,
        rhs: server._id,
        link: memo.containsEntity._id,
        description: "hqdevserver01d is contained within the development environment"
      });

      link.save(function (err) {
        if (err) {
          memo.err = err;
          defer.reject(memo);
        } else {
          memo.serverId += 1;
          memo.servers.push(server);
          defer.resolve(memo);
        }
      });
    }


  });

  return defer.promise;
}

function hostsApp(memo) {

  var defer = Q.defer();

  var app = new Entity({
    name: "some-web-app",
    classification: "noun",
    uri: "some-web-app",
    labels: ["web", "app"],
    description: "some web app",
    icon: "icon-earth",
    meta: {}
  });

  app.save(function (err) {

    if (err) {
      memo.err = err;
      defer.reject(memo);
    } else {

      var link = new EntityLink({
        lhs: memo.servers[0]._id,
        rhs: app._id,
        link: memo.hostsEntity._id,
        description: "This server hosts this app"
      });

      link.save(function (err) {
        if (err) {
          memo.err = err;
          defer.reject(memo);
        } else {
          defer.resolve(memo);
        }
      });
    }
  });

  return defer.promise;
}

function run() {
  var memo = {
    servers: []
  };

  return containsEntityFn(memo)
    .then(relatedEntityFn)
    .then(hostsEntityFn)
    .then(developmentEnvironmentEntity)
    .then(devServerEntityFn)
    .then(devServerEntityFn)
    .then(devServerEntityFn)
    .then(devServerEntityFn)
    .then(devServerEntityFn)
    .then(hostsApp).catch(function(err){
      console.log(err);
    });
}

run();


