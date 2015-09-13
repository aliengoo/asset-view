///<reference path="../../typings/tsd.d.ts"/>
///<reference path="entity.ts"/>

"use strict";

module av.entity {

  export interface IEntityLinkService {
    getLhsLinks(id:string): angular.IPromise<Array<IEntityLink>>;

    getRhsLinks(id:string): angular.IPromise<Array<IEntityLink>>;
  }

  export class EntityLinkService implements IEntityLinkService {


    /* @ngInject */
    constructor(
      private $http:angular.IHttpService,
      private $q:angular.IQService) {
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