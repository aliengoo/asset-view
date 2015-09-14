///<reference path="../../../../typings/tsd.d.ts"/>

"use strict";

module av.entity {

  export function entityLabels(): angular.IDirective {
    return {
      restrict: "E",
      templateUrl: "entity/directives/entity-labels/entity-labels.directive.html",
      scope: {
        entity: "="
      }
    };
  }
}
