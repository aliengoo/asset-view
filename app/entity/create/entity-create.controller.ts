///<reference path="../entity.ts"/>

"use strict";

module av.entity {
  export class EntityCreateController {

    public entity:IEntity;

    /* @ngInject */
    constructor(public adjectiveEntities:Array<IEntity>, public entityService:IEntityService) {
      this.entity = <IEntity>{};
    }

    save() {
      this.entityService.save(this.entity).then((result):void => {
        this.entity = result;
      });
    }
  }
}
