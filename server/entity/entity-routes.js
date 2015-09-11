"use strict";

var util = require("util");
var format = util.format;

var mongoose = require("mongoose");

var Entity = require("./entity").Entity;
var entityTypes = require("./entity-types");
var entityEnvironments = require("./entity-environments");

module.exports = function (app) {

  app.get("/api/entity/types", function (req, res) {
    res.send(entityTypes);
  });

  app.get("/api/entity/environments", function (req, res) {
    res.send(entityEnvironments);
  });

  // saves the entity
  var postHandler = function(req, res) {

    var entity = new Entity(req.body);

    entity.save(function (err, result) {
      if (err) {
        res.status(500).send({
          ok: false,
          message: util.inspect(err)
        });
      } else {
        res.send(result);
      }
    });
  };

  // for new documents
  app.post("/api/entity", postHandler);

  // for existing documents - same operation, but different URI
  app.post("/api/entity/:id", postHandler);

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
      res.status(500).send({
        ok: false,
        message: util.inspect(errors)
      });
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
            res.status(500).send({
              ok: false,
              message: util.inspect(err)
            });
          }

          res.send(results);
        });
    }
  });
};