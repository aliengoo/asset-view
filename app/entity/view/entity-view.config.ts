///<reference path="../../../typings/tsd.d.ts"/>
///<reference path="../entity.service.ts"/>
"use strict";

module av.entity {

  export class EntityViewConfig {

    /* @ngInject */
    constructor($stateProvider:angular.ui.IStateProvider) {

      $stateProvider.state("entity.view", <angular.ui.IState>{
        url: "/view/:id",
        controller: "EntityViewController as vm",
        templateUrl: "entity/view/entity-view.html",
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