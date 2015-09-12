///<reference path="../../../typings/tsd.d.ts"/>
///<reference path="./entity-view.controller.ts"/>
///<reference path="../entity.service.ts"/>

"use strict";

module av.entity {
  export class EntityViewConfig {
    /* @ngInject */
    constructor($stateProvider:angular.ui.IStateProvider) {

      /* @ngInject */
      var entityResolve = ($stateParams:angular.ui.IStateParamsService,
                           entityService:av.entity.IEntityService):angular.IPromise<IEntity> => {
        return entityService.get(<string>$stateParams["id"]);
      };

      $stateProvider.state("entity.view", <angular.ui.IState>{
        url: "/view/:id",
        controller: EntityViewController,
        controllerAs: "vm",
        templateUrl: "entity/view/entity-view.html",
        resolve: {
          entity: entityResolve
        }
      });
    }
  }
}