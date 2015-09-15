///<reference path="../../typings/tsd.d.ts"/>


"use strict";

module av {

  export class SandboxController {

    public cs:av.canvas.ICanvasEngine;

    /* @ngInject */
    constructor($window:Window) {

      this.cs = new av.canvas.CanvasEngine("container", {
        height: $window.outerHeight,
        width: $window.outerWidth
      });

      this.drawEntity();
    }

    private drawEntity() {
      var square = this.cs.drawSquare({
        x: 50,
        y: 50
      }, 200, {
        width: 1
      });

      var entitySet = this.cs.paper.set();
      entitySet.push(square);

      entitySet.push(this.cs.drawTextWithinParent(square, {x:50, y:30}, "Hello, World!"));
      this.cs.draggable(entitySet);
    }
  }
}
