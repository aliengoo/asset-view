"use strict";

module av.entity {

  export function uriInput(): angular.IDirective {
    return <angular.IDirective> {
      restrict: "E",
      require: "^form",
      scope: {
        value: "="
      },
      templateUrl: "entity/directives/uri-input/uri-input.directive.html"
    };
  }
}
