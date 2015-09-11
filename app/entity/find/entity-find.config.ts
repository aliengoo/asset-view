///<reference path="../../../typings/tsd.d.ts"/>
///<reference path="../entity.service.ts"/>
"use strict";

module av.entity {

  export class EntityFindConfig {

    /* @ngInject */
    constructor($stateProvider:angular.ui.IStateProvider) {

      $stateProvider.state("entity.find", <angular.ui.IState>{
        url: "/find/:id",
        controller: "EntityViewController as vm",
        templateUrl: "entity/find/entity-find.html"
      })
    }
  }
}