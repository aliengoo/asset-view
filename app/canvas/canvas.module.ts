///<reference path="canvas-engine.ts"/>
///<reference path="canvas.service.ts"/>
///<reference path="font.ts"/>
///<reference path="line.ts"/>
///<reference path="point.ts"/>
///<reference path="size.ts"/>



"use strict";

module av.canvas {

  angular.module("av.canvas", ["av.common"])
    .service("canvasService", CanvasService);
}
