///<reference path="../../../../typings/tsd.d.ts"/>


"use strict";

module av.entity {
  export function entityHeader(): angular.IDirective {
    return {
      restrict: "E",
      scope: {
        entity: '='
      },
      templateUrl: "entity/directives/entity-header/entity-header.directive.html"
    };
  }
}