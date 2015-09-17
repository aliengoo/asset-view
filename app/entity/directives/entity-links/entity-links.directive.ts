///<reference path="../../../../typings/tsd.d.ts"/>
///<reference path="..\..\entity-linkage.service.ts"/>
///<reference path="..\..\entity.ts"/>

"use strict";

"use strict";

module av.entity {

  export interface IEntityLinkScope extends angular.IScope {
    inProgress: boolean;
    entity:IEntity;
    entityLinkage:IEntityLinkage;
  }

  export function entityLinks(entityLinkageService:IEntityLinkageService): angular.IDirective {
    return {
      restrict: "E",
      scope: {
        entity: '='
      },
      link: link,
      templateUrl: "entity/directives/entity-links/entity-links.directive.html"
    };

    function link(scope:IEntityLinkScope) {
      scope.inProgress = true;
      scope.entityLinkage = entityLinkageService.create(scope.entity);



    }
  }
}