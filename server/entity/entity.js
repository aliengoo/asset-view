"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var entityClassifications = require("./entity-classifications");

var entitySchema = new Schema({

  // the unique identifier or name
  name: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },

  // is this an object or something describing an object
  classification: {
    type: String,
    "enum": entityClassifications,
    required: true
  },

  uri: {
    type: String
  },

  labels: {
    type: [String]
  },

  // The description
  description: {
    type: String
  },

  // Whatever you want
  meta: {
    type: Schema.Types.Mixed
  }

}, {
  collection: "entity"
});

// Text index
entitySchema.index({
  name: "text",
  labels: "text"
});

var entityModel = mongoose.model("Entity", entitySchema);

module.exports.Entity = entityModel;
module.exports.schema = entitySchema;
