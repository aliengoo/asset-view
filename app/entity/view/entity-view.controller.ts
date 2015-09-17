///<reference path="../../../typings/tsd.d.ts"/>

///<reference path="../entity.ts"/>
///<reference path="../entity.service.ts"/>
///<reference path="../entity-linkage.service.ts"/>
///<reference path="..\entity-svg\entity-svg.ts"/>

"use strict";

module av.entity {
  export class EntityViewController {


    /* @ngInject */
    constructor(
      public entity:IEntity,
      private entityService:IEntityService,
      private entityLinkageService:IEntityLinkageService,
      private icomoonService:av.common.IIcomoonService) {

      // show details of the target entity

      // get links to the left-hand side

      // get links to the right-hand side

      // offer to create lhs links

      // offer to create rhs links

      // to create links between entities requires the ability to find an entity to link to
    }
  }
}
