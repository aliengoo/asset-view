///<reference path="../../../../typings/tsd.d.ts"/>
///<reference path="..\..\entity.ts"/>
"use strict";

module av.entity {

  interface IEntityMiniScope extends angular.IScope {
    entity: IEntity
  }

  export function entityMini(): angular.IDirective {
    return {
      restrict: "E",
      scope: {
        entity: "="
      },
      templateUrl: "entity/directives/entity-mini/entity-mini.directive.html"
    };
  }
}
