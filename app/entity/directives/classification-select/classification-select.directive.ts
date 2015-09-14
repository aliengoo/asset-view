"use strict";

module av.entity {

  export function classificationSelect(): angular.IDirective {
    return <angular.IDirective> {
      restrict: "E",
      require: "^form",
      scope: {
        entity: "="
      },
      templateUrl: "entity/directives/classification-select/classification-select.directive.html"
    };
  }
}
