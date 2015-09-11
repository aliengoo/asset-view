"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var entityLinkSchema = new Schema({
  lhs: {
    type: Schema.Types.ObjectId,
    required: true,
    index: true
  },
  rhs: {
    type: Schema.Types.ObjectId,
    required: true
  },
  link: {
    // Must have a entity.classification of "adjective"
    type: Schema.Types.ObjectId,
    required: true
  },
  description: {
    type: String
  }

}, {
  collection: "entityLink"
});

var entityLinkModel = mongoose.model("EntityLink", entityLinkSchema);

module.exports.EntityLink = entityLinkModel;
module.exports.EntitySchema = entityLinkSchema;
