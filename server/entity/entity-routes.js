"use strict";

var util = require("util");
var format = util.format;

var mongoose = require("mongoose");

var Entity = require("./entity").Entity;
var EntityLink = require("./entity-link").EntityLink;

var entityLinkage = require("./entity-linkage");

module.exports = function (app) {

   app.get("/api/entity/adjectives", function (req, res) {
    Entity.find({
      classification: "adjective"
    }, function(err, results) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(results);
      }
    });
  });

  // saves the entity
  var postHandler = function(req, res) {

    var entity = new Entity(req.body);

    entity.save(function (err, result) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(result);
      }
    });
  };

  // for new documents
  app.post("/api/entity", postHandler);

  // for existing documents - same operation, but different URI
  app.post("/api/entity/:id", postHandler);

  app.get("/api/entity/:id", function (req, res) {
    Entity.findById(req.params.id, function (err, result) {
      if(err) {
        res.status(500).send(err);
      } else {
        res.send(result);
      }
    });
  });

  app.get("/api/entity/:id/links", function (req, res) {
    entityLinkage.getLinks(req.params.id).then(function(entityLinks){
      console.log("All requests are finished", entityLinks[0].lhsEntity);
      res.json(entityLinks);
    }, function(error){
      res.status(500).send(error);
    });
  });

  // Retrieves links where the entity is on the rhs of the relationship
  app.get("/api/entity/:id/links/lhs", function(req, res) {

    EntityLink.find({
      lhs: mongoose.Types.ObjectId(req.params.id)
    }, function(err, results){
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(results);
      }
    });
  });

  // Retrieves links where the entity is on the lhs of the relationship
  app.get("/api/entity/:id/links/rhs", function(req, res) {

    EntityLink.find({
      rhs: mongoose.Types.ObjectId(req.params.id)
    }, function(err, results){
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(results);
      }
    });
  });

  app.delete("/api/entity/:id", function(req, res) {

    var id = mongoose.Types.ObjectId(req.params.id);
    var query = Entity.where({
      _id: id
    });

    query.findOneAndRemove(function(err) {
      if (err) {
        res.status(500).send({
          ok: false,
          message: util.inspect(err)
        });
      } else {
        res.send({
          ok: true,
          message: format("Document %s was deleted", req.params.id)
        });
      }
    });

  });

  app.post("/api/entity/full-text-search", function (req, res) {

    req.checkBody("search", "search property is required").notEmpty().isString();

    var errors = req.validationErrors();

    if (errors) {
      res.status(500).send(errors);
    } else {

      // TODO: Add weights
      Entity.find(
        {
          $text: {
            $search: req.body
          }
        },
        {
          search: {
            $meta: "textScore"
          }
        }
      ).sort({
          score: {
            $meta: "textScore"
          }
        }).exec(function (err, results) {
          if(err) {
            res.status(500).send(err);
          }

          res.send(results);
        });
    }
  });
};