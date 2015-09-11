///<reference path="../../typings/tsd.d.ts"/>
///<reference path="entity.ts"/>
///<reference path="entity.service.ts"/>
///<reference path="create/entity-create.controller.ts"/>
///<reference path="find/entity-find.controller.ts"/>
///<reference path="view/entity-view.controller.ts"/>
///<reference path="edit/entity-edit.controller.ts"/>

"use strict";

module av.entity {
  export class EntityConfig {

    /* @ngInject */
    constructor(
      private $stateProvider:angular.ui.IStateProvider) {

      /* @ngInject */
      var adjectiveEntitiesResolve = (entityService:av.entity.EntityService): angular.IPromise<Array<IEntity>> => {
        return entityService.getAdjectives();
      };


      $stateProvider.state("entity", <angular.ui.IState>{
        abstract: true,
        url: "/entity",
        controller: "EntityController as vm",
        templateUrl: "entity/entity.html",
        resolve: {
          adjectiveEntities: adjectiveEntitiesResolve,
          test: ($q:angular.IQService):angular.IPromise<string> => {
            return $q.when("Hello");
          }
        }
      }).state("entity.find", <angular.ui.IState>{
        url: "/find",
        controller: "EntityFindController as vm",
        templateUrl: "entity/find/entity-find.html"
      }).state("entity.create", <angular.ui.IState>{
        url: "/create",
        controller: "EntityCreateController as vm",
        templateUrl: "entity/create/entity-create.html"
      }).state("entity.view", <angular.ui.IState>{
        url: "/view/:id",
        controller: "EntityViewController as vm",
        templateUrl: "entity/view/entity-view.html"
      }).state("entity.edit", <angular.ui.IState>{
        url: "/edit/:id",
        controller: "EntityEditController as vm",
        templateUrl: "entity/edit/entity-edit.html"
      });
    }
  }
}


