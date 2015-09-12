///<reference path="../../typings/tsd.d.ts"/>
///<reference path="entity.ts"/>
///<reference path="entity.service.ts"/>
///<reference path="./entity.controller.ts"/>

"use strict";

module av.entity {
  export class EntityConfig {

    /* @ngInject */
    constructor(private $stateProvider:angular.ui.IStateProvider) {

      /* @ngInject */
      var adjectiveEntitiesResolve = (entityService:av.entity.EntityService):angular.IPromise<Array<IEntity>> => {
        return entityService.getAdjectives();
      };

      $stateProvider.state("entity", <angular.ui.IState>{
        abstract: true,
        url: "/entity",
        controller: EntityController,
        templateUrl: "entity/entity.html",
        resolve: {
          adjectiveEntities: adjectiveEntitiesResolve
        }
      });
    }
  }
}


