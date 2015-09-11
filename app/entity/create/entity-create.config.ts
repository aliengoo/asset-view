///<reference path="../../../typings/tsd.d.ts"/>
///<reference path="../entity.service.ts"/>
"use strict";

module av.entity {

  export class EntityCreateConfig {

    /* @ngInject */
    constructor($stateProvider:angular.ui.IStateProvider) {

      $stateProvider.state("entity.create", <angular.ui.IState>{
        url: "/create/:id",
        controller: "EntityCreateController as vm",
        templateUrl: "entity/create/entity-create.html"
      })
    }
  }
}