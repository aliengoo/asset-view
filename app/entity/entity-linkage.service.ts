///<reference path="../../typings/tsd.d.ts"/>
///<reference path="entity.ts"/>
///<reference path="entity-link.ts"/>
///<reference path="entity-link.service.ts"/>
///<reference path="entity.service.ts"/>


"use strict";

module av.entity {
  export interface IEntityLinkage {
    lhs():angular.IPromise<IEntityLink[]>;

    rhs():angular.IPromise<IEntityLink[]>;

    getEntityLinkageFor(linkId:string): angular.IPromise<IEntityLinkage>
  }

  export class EntityLinkage implements IEntityLinkage {

    private leftHandSide:IEntityLink[];
    private rightHandSide:IEntityLink[];

    constructor(
      public entity:IEntity,
      private $q:angular.IQService,
      private entityService:IEntityService,
      private entityLinkService:IEntityLinkService) {
    }

    /**
     * Retrieve links where this entity is on the rhs of the relationship
     *
     * links <- entity
     * @returns {IPromise<T>}
     */

    lhs():angular.IPromise<av.entity.IEntityLink[]> {

      var defer = this.$q.defer();

      if (this.leftHandSide) {
          defer.resolve(this.leftHandSide);
      }

      this.entityLinkService.getLhsLinks(this.entity._id).then((entityLinks:IEntityLink[]) => {
        this.leftHandSide = entityLinks;
        defer.resolve(entityLinks);
      });

      return defer.promise;
    }

    /**
     * Retrieve links where this entity is on the lhs of the relationship
     * entity -> links
     * @returns {IPromise<T>}
     */
    rhs():angular.IPromise<av.entity.IEntityLink[]> {
      var defer = this.$q.defer();

      if (this.rightHandSide) {
        defer.resolve(this.rightHandSide);
      }

      this.entityLinkService.getLhsLinks(this.entity._id).then((entityLinks:IEntityLink[]) => {
        this.rightHandSide = entityLinks;
        defer.resolve(entityLinks);
      });

      return defer.promise;
    }

    public getEntityLinkageFor(objectId:string): angular.IPromise<IEntityLinkage> {
      var _this = this;

      var defer = _this.$q.defer();


      _this.entityService.get(objectId).then((entity:IEntity) => {

        var entityLinkage:IEntityLinkage;

        if (entity){
          entityLinkage = new EntityLinkage(entity, _this.$q, _this.entityService, _this.entityLinkService);
        }

        defer.resolve(entityLinkage);
      });

      return defer.promise;
    }

  }

  export interface IEntityLinkageService {
    create(entity:IEntity):IEntityLinkage;
  }

  export class EntityLinkageService implements IEntityLinkageService{

    /* @ngInject */
    constructor(
      private $q:angular.IQService,
      private entityService:IEntityService,
      private entityLinkService:IEntityLinkService) {
    }

    create(entity:IEntity):IEntityLinkage {
      return new EntityLinkage(entity, this.$q, this.entityService, this.entityLinkService);
    }
  }
}
