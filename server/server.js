"use strict";

var express = require("express");
var cors = require('cors');
var appSettings = require('./app-settings')();
var dbInit = require('./db-init');
var bodyParser = require("body-parser");
var expressValidator = require("express-validator");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dbInit(appSettings.databaseUrl);

app.options("*", cors(appSettings.corsOptions));

app.disable('etag');

app.use(express.static('public'));

// normalise query params
app.use(function(req, res, next) {
  for (var key in req.query) {
    req.query[key.toLowerCase()] = req.query[key];
  }

  next();
});

require("./entity/entity-routes")(app);

app.listen(appSettings.port, function () {
  console.log("Asset View Server Started");
});