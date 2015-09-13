"use strict";

describe("EntityController", function() {

  var $controller;

  beforeEach(module("av.entity"));

  beforeEach(module(function($provide) {
    $provide.value("adjectiveEntities", [{
      _id: "a",
      name: "container"
    }]);
  }));

  beforeEach(inject(function (_$controller_) {
    $controller = _$controller_;
  }));

  describe("EntityController.adjectiveEntities", function() {
    it("should be populated", function() {
      var entityController = $controller("EntityController", {});

      expect(entityController.adjectiveEntities.length === 1).toBeTruthy();
    });
  });

});