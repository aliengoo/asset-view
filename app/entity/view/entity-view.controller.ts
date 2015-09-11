///<reference path="../entity.ts"/>

"use strict";

module av.entity {
  export class EntityViewController {

    /* @ngInject */
    constructor(public entity:IEntity, public adjectiveEntities:Array<IEntity>, public entityService:IEntityService) {
    }

  }
}
