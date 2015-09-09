"use strict";

describe("HomeService", function () {

  var homeService, $rootScope;

  beforeEach(module("atd.home"));

  beforeEach(inject(function (_homeService_, _$rootScope_) {
    homeService = _homeService_;
    $rootScope = _$rootScope_;
  }));

  describe("sayHelloAsync", function () {

    it("should reject when no name argument is supplied", function () {

      // arrange
      var successHandler = jasmine.createSpy("success");
      var errorHandler = jasmine.createSpy("error");

      var name = undefined;

      // act
      homeService.sayHelloAsync(name).then(successHandler, errorHandler);

      $rootScope.$digest();

      // assert
      expect(successHandler).not.toHaveBeenCalled();
      expect(errorHandler).toHaveBeenCalled();
    });

    it("should resolve when name argument is supplied", function () {

      // arrange
      var successHandler = jasmine.createSpy("success");
      var errorHandler = jasmine.createSpy("error");

      var name = "Homer";

      // act
      homeService.sayHelloAsync(name).then(successHandler, errorHandler);

      $rootScope.$digest();

      // assert
      expect(successHandler).toHaveBeenCalled();
      expect(errorHandler).not.toHaveBeenCalled();
    });
  });

});
