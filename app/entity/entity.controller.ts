///<reference path="entity.service.ts"/>
///<reference path="entity.ts"/>


"use strict";

module av.entity {

  export class EntityController {

    adjectiveEntities:Array<IEntity>;

    /* @ngInject */
    constructor(entityService:IEntityService) {

      entityService.getAdjectives().then((entities:Array<IEntity>):void => {
        this.adjectiveEntities = entities;
      });
    }
  }
}


