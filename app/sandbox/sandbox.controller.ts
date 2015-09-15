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
      var square = this.cs.drawRect({
        x: 50,
        y: 50
      }, {
        width: 300,
        height: 200
      }, {
        width: 1
      });

      var entitySet = this.cs.paper.set();
      entitySet.push(square);

      entitySet.push(this.cs.drawTextWithinParent(square, {x:10, y:10}, "the quick brown fox jumped over the lazy dog", {
        size: 16,
        family: '"Helvetica Neue", Helvetica, Arial, sans-serif'
      }, 100));


      entitySet.push(this.cs.drawImageWithinParent(square, "assets/svg/server.svg", {
        x: square.getBBox().width - 5 - 36,
        y: 5
      }, {
        width: 36,
        height: 36
      }));

      this.cs.draggable(entitySet);
    }
  }
}
