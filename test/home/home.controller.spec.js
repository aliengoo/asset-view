"use strict";

describe("HomeController", function () {
  var $controller, $q;


  beforeEach(module("av.home"));

  beforeEach(module(function($provide){
    $provide.service("homeService", function () {
      return {
        sayHello: function() {
          return "Test Hello, World";
        },
        sayHelloAsync: function() {

        }
      };
    });
  }));

  beforeEach(inject(function (_$controller_, _$q_) {
    $controller = _$controller_;
    $q = _$q_;
  }));


  describe("homeController.message", function () {
    it("should say 'Hello, World!'", function () {
      var controller = $controller('HomeController', {});
      expect(controller.message).toEqual("Test Hello, World");
    });
  });
});