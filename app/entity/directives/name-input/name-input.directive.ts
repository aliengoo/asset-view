"use strict";

module av.entity {

  export function nameInput(): angular.IDirective {
    return <angular.IDirective> {
      restrict: "E",
      require: "^form",
      scope: {
        entity: "="
      },
      templateUrl: "entity/directives/name-input/name-input.directive.html"
    };
  }
}
