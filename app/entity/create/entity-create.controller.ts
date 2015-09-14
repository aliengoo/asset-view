///<reference path="../../../typings/tsd.d.ts"/>

///<reference path="../entity.ts"/>

"use strict";

module av.entity {
  export class EntityCreateController {

    public entity:IEntity;

    /* @ngInject */
    constructor(
      public adjectiveEntities:Array<IEntity>,
      public entityService:IEntityService,
      public $state:angular.ui.IStateService) {
      this.entity = <IEntity>{
      };
    }

    save() {

      var controller = this;
      this.entityService.save(this.entity).then((result):void => {
        controller.entity = result;
        controller.$state.go("entity.view");
      });
    }
  }
}
