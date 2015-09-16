///<reference path="../../../typings/tsd.d.ts"/>

///<reference path="../entity.ts"/>
///<reference path="../entity.service.ts"/>
///<reference path="..\entity-svg\entity-svg.ts"/>
"use strict";

module av.entity {
  export class EntityViewController {

    private entitySvg:EntitySvg;

    /* @ngInject */
    constructor(
      public entity:IEntity,
      private canvasService: av.canvas.CanvasService,
      private _:_.LoDashStatic,
      private icomoonService:av.common.IIcomoonService) {

      console.log(this.entity.name);

      var canvasEngine = canvasService.getEngine("entity-container");

      this.entitySvg = new av.entity.EntitySvg(canvasEngine, _, icomoonService);

      this.entitySvg.render(this.entity, {
        x:0, y:0
      });
    }
  }
}
