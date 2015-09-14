"use strict";

module av.entity {

  export function labelsInput(): angular.IDirective {
    return <angular.IDirective> {
      restrict: "E",
      require: "^form",
      scope: {
        entity: "="
      },
      templateUrl: "entity/directives/labels-input/labels-input.directive.html"
    };
  }
}
