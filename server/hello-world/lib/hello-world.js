"use strict";

module.exports = function(app) {

  app.get("/api/hello-world", function(req, res) {
    res.json({
      message: "Hello, World!"
    });
  });

};