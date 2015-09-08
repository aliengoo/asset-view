

describe("HomeController", function(){

  beforeEach(module("atd.home"));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe("homeController.message", function() {

    it("should say 'Hello, World!'", function () {

      var controller = $controller('HomeController', {});

      expect(controller.message).to.equal(undefined);
    });
  });
});