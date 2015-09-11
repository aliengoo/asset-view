///<reference path="entity.ts"/>

"use strict";

module av.entity {

  export interface IEntityService {
    save(entity:IEntity): angular.IPromise<IEntity>;

    get(id:string): angular.IPromise<IEntity>;

    getAdjectives(): angular.IPromise<Array<IEntity>>;

    getLhsLinks(id:string): angular.IPromise<Array<IEntityLink>>;

    getRhsLinks(id:string): angular.IPromise<Array<IEntityLink>>;
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
     * @returns {IPromise<Array<IEntity>>}
     */
    getAdjectives(): angular.IPromise<Array<IEntity>> {
      var defer:angular.IDeferred<Array<IEntity>> = this.$q.defer();

      var config = <angular.IRequestShortcutConfig> {
        cache: true
      };

      this.$http.get("api/entity/adjectives", config).success((response:Array<IEntity>): void =>{
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

    /**
     * Retrieve links from one side
     * @param side
     * @param id
     * @returns {IPromise<Array<IEntityLink>>}
     */
    private getLinks(side:string, id:string):angular.IPromise<Array<IEntityLink>> {
      var defer:angular.IDeferred<Array<IEntityLink>> = this.$q.defer();

      var config = <angular.IRequestShortcutConfig>{
        params: {
          id: id
        }
      };

      this.$http.get(`api/entity/:id/${side}`, config).success((response:Array<IEntityLink>): void =>{
        defer.resolve(response);
      }).error(():void => {
        defer.reject();
      });

      return defer.promise;
    }

    /**
     * Retrieve links from the left-hand side
     * @param id
     * @returns {angular.IPromise<Array<IEntityLink>>}
     */
    getLhsLinks(id:string):angular.IPromise<Array<IEntityLink>> {
      return this.getLinks("lhs", id);
    }

    /**
     * Retrieve links from the right-hand side
     * @param id
     * @returns {angular.IPromise<Array<IEntityLink>>}
     */
    getRhsLinks(id:string):angular.IPromise<Array<av.entity.IEntityLink>> {
      return this.getLinks("rhs", id);
    }
  }
}


