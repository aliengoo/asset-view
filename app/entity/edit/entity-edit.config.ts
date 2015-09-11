///<reference path="../../../typings/tsd.d.ts"/>
///<reference path="../entity.service.ts"/>
"use strict";

module av.entity {

  export class EntityEditConfig {

    /* @ngInject */
    constructor($stateProvider:angular.ui.IStateProvider) {

      $stateProvider.state("entity.edit", <angular.ui.IState>{
        url: "/edit/:id",
        controller: "EntityEditController as vm",
        templateUrl: "entity/edit/entity-edit.html",
        resolve: {
          entity: ($stateParams:angular.ui.IStateParamsService,
                   entityService:av.entity.IEntityService):angular.IPromise<IEntity> => {
            return entityService.get(<string>$stateParams["id"]);
          }
        }
      })
    }
  }
}