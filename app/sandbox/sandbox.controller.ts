"use strict";

module av {

  export class SandboxController {

    public sandbox:HTMLCanvasElement;
    public ctx:CanvasRenderingContext2D;

    /* @ngInject */
    constructor() {

      this.sandbox = <HTMLCanvasElement>document.getElementById("sandbox");

      this.ctx = this.sandbox.getContext("2d");

      this.ctx.fillStyle = "rgb(200,0,0)";
      this.ctx.fillRect (10, 10, 55, 50);

      this.ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
      this.ctx.fillRect (30, 30, 55, 50);

      this.ctx.font = 'italic 40pt Calibri';
      this.ctx.fillText('Hello World!', 150, 100);
    }
  }
}
