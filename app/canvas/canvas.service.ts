///<reference path="../../typings/tsd.d.ts"/>
///<reference path="canvas-engine.ts"/>

"use strict";

module av.canvas {

  export interface ICanvasService {
    getEngine(containerId:string):ICanvasEngine;
  }

  export class CanvasService implements ICanvasService {

    constructor() {
    }

    getEngine(containerId:string):ICanvasEngine {
      return new CanvasEngine(containerId);
    }
  }
}
