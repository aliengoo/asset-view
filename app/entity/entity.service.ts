///<reference path="../../typings/tsd.d.ts"/>
///<reference path="entity.ts"/>

"use strict";

module av.entity {

  export interface IEntityService {
    save(entity:IEntity): angular.IPromise<IEntity>;

    get(id:string): angular.IPromise<IEntity>;

    getAdjectives(): angular.IPromise<IEntity[]>;

    search(name:string): angular.IPromise<IEntity[]>;
  }

  export class EntityService implements IEntityService{

    /* @ngInject */
    constructor(
      private $http:angular.IHttpService,
      private $q:angular.IQService) {
    }

    /**
     * Saves an entity
     * @param entity
     * @returns {IPromise<IEntity>}
     */
    save(entity:IEntity):angular.IPromise<IEntity> {
      var defer:angular.IDeferred<IEntity> = this.$q.defer();

      this.$http.post("api/entity/:id", entity).success((response:IEntity): void =>{
        defer.resolve(response);
      }).error(():void => {
        defer.reject();
      });

      return defer.promise;
    }

    /**
     * Retrieves entities with a classification of adjective
     * @returns {IPromise<IEntity[]>}
     */
    getAdjectives(): angular.IPromise<IEntity[]> {
      var defer:angular.IDeferred<IEntity[]> = this.$q.defer();

      var config = <angular.IRequestShortcutConfig> {
        cache: false
      };

      this.$http.get("api/entity/adjectives", config).success((response:IEntity[]): void =>{
        defer.resolve(response);
      }).error(():void => {
        defer.reject();
      });

      return defer.promise;
    }

    /**
     * Gets a single entity using the _id
     * @param id
     * @returns {IPromise<IEntity>}
     */
    get(id:string): angular.IPromise<IEntity> {
      var defer:angular.IDeferred<IEntity> = this.$q.defer();

      var config = <angular.IRequestShortcutConfig>{
        params: {
          id: id
        }
      };

      this.$http.get("api/entity/:id", config).success((response:IEntity): void =>{
        defer.resolve(response);
      }).error(():void => {
        defer.reject();
      });

      return defer.promise;
    }

    search(name:string): angular.IPromise<IEntity[]> {
      var defer:angular.IDeferred<IEntity[]> = this.$q.defer();

      var config = <angular.IRequestShortcutConfig>{
        params: {
          name: name
        }
      };

      this.$http.get("api/entity", config).success((response:IEntity[]): void =>{
        defer.resolve(response);
      }).error(():void => {
        defer.reject();
      });

      return defer.promise;
    }
  }
}


