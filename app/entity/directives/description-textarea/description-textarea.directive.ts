"use strict";

module av.entity {

  export function descriptionTextarea(): angular.IDirective {
    return <angular.IDirective> {
      restrict: "E",
      require: "^form",
      scope: {
        entity: "="
      },
      templateUrl: "entity/directives/description-textarea/description-textarea.directive.html"
    };
  }
}
