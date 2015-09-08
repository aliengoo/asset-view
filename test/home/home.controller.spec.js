"use strict";

describe("HomeController", function () {

  beforeEach(module("atd.home"));

  var $controller;

  beforeEach(inject(function (_$controller_) {
    $controller = _$controller_;
  }));

  describe("homeController.message", function () {

    it("should say 'Hello, World!'", function () {

      var controller = $controller('HomeController', {});

      expect(controller.message).toEqual("Hello, World!");
    });
  });
});