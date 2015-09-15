///<reference path="../../typings/tsd.d.ts"/>
///<reference path="..\entity\entity-svg\entity-svg.service.ts"/>


"use strict";

module av {

  export class SandboxController {

    public cs:av.canvas.ICanvasEngine;

    /* @ngInject */
    constructor($window:Window, entitySvgService:av.entity.IEntitySvgService) {

      this.cs = new av.canvas.CanvasEngine("container", {
        height: $window.outerHeight,
        width: $window.outerWidth
      });

      this.drawEntity();
    }

    private drawEntity() {

    }
  }
}
