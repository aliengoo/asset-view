///<reference path="../../typings/tsd.d.ts"/>
///<reference path="entity.ts"/>
///<reference path="entity.service.ts"/>

"use strict";

module av.entity {
  export class EntityConfig {

    /* @ngInject */
    constructor($urlRouterProvider:angular.ui.IUrlRouterProvider, $stateProvider:angular.ui.IStateProvider) {

      $urlRouterProvider.otherwise("/entity/find");

      $stateProvider.state(<angular.ui.IState>{
        name: "entity",
        controller: "EntityController as vm",
        templateUrl: "entity/entity.html"
      });

      $stateProvider.state(<angular.ui.IState>{
        name: "entity.find",
        url: "/find",
        controller: "EntityFindController as vm",
        templateUrl: "entity/find/entity-find.html",
        resolve: {
          adjectiveEntities: (entityService:av.entity.EntityService): angular.IPromise<Array<IEntity>> => {
            return entityService.getAdjectives();
          }
        }
      });

      $stateProvider.state(<angular.ui.IState>{
        name: "entity.create",
        url: "/create",
        controller: "EntityCreateController as vm",
        templateUrl: "entity/create/entity-create.html",
        resolve: {
          adjectiveEntities: (entityService:av.entity.EntityService): angular.IPromise<Array<IEntity>> => {
            return entityService.getAdjectives();
          }
        }
      });

      $stateProvider.state(<angular.ui.IState>{
        name: "entity.view",
        url: "/view/:id",
        controller: "EntityViewController as vm",
        templateUrl: "entity/view/entity-view.html",
        resolve: {
          adjectiveEntities: (entityService:av.entity.EntityService): angular.IPromise<Array<IEntity>> => {
            return entityService.getAdjectives();
          }
        }
      });

      $stateProvider.state(<angular.ui.IState>{
        name: "entity.edit",
        url: "/edit/:id",
        controller: "EntityEditController as vm",
        templateUrl: "entity/edit/entity-edit.html",
        resolve: {
          adjectiveEntities: (entityService:av.entity.EntityService): angular.IPromise<Array<IEntity>> => {
            return entityService.getAdjectives();
          }
        }
      });
    }
  }
}


