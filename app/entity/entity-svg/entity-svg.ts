///<reference path="../../../typings/tsd.d.ts"/>
///<reference path="..\entity.ts"/>

"use strict";

module av.entity {

  export class EntitySvg {

    private ce:av.canvas.ICanvasEngine;

    constructor(public entity:IEntity, canvasEngine:av.canvas.ICanvasEngine) {
      this.ce = canvasEngine;

      this.render();
    }

    private render(){

    }
  }
}
