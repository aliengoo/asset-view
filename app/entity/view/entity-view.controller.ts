///<reference path="../entity.ts"/>
///<reference path="../entity.service.ts"/>
"use strict";

module av.entity {
  export class EntityViewController {

    /* @ngInject */
    constructor(
      public entity:IEntity,
      public adjectiveEntities:Array<IEntity>,
      private entityService:IEntityService) {
    }

  }
}
