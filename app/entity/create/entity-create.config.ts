///<reference path="../../../typings/tsd.d.ts"/>
///<reference path="./entity-create.controller.ts"/>

"use strict";

module av.entity {
  export class EntityCreateConfig {
    /* @ngInject */
    constructor($stateProvider:angular.ui.IStateProvider) {
      $stateProvider.state("entity.create", <angular.ui.IState>{
        url: "/create",
        controller: EntityCreateController,
        controllerAs: "vm",
        templateUrl: "entity/create/entity-create.html"
      });
    }
  }
}