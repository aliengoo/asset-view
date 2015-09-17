"use strict";

var Q = require("q");
var Entity = require("./entity").Entity;
var EntityLink = require("./entity-link").EntityLink;

var ObjectId = require("mongoose").Schema.Types.ObjectId;

var clone = require("clone");

module.exports.getLinks = function getLinks(entityId) {

  var defer = Q.defer();

  var query = {
    $or: [{
      rhs: entityId
    }, {
      lhs: entityId
    }]
  };


  EntityLink.find(query, function(err, results){
    if (err) {
      defer.reject(err);
    } else {
      if (!results || results.length === 0) {
        defer.resolve([]);
      } else {

        var requests = [];

        var entityLinks = [];

        results.forEach(function(entityLink){
          requests.push(getEntity(entityLink.lhs).then(function(entity){

            entityLink.lhsEntity = entity;
            console.log("entitylink.lhs");
            entityLinks.push(entityLink);

            return entityLink;
          }));
          requests.push(getEntity(entityLink.rhs).then(function(entity){
            entityLink.rhsEntity = entity;
            entityLinks.push(entityLink);

            console.log("entitylink.rhs");

            return entityLink;
          }));
        });

        Q.all(requests).then(function(){


          console.log("All requests are finished", entityLinks[0].lhsEntity);

          defer.resolve(entityLinks);
        });
      }
    }
  });

  return defer.promise;
};

function getEntity(entityId) {

  var defer = Q.defer();

  Entity.findById(entityId, function (err, entity) {
    if (err) {
      defer.reject(err);
    } else {
      defer.resolve(entity);
    }
  });

  return defer.promise;
}
