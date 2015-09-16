///<reference path="../../typings/tsd.d.ts"/>



"use strict";

module av {

  export class SandboxController {

    public message:string;

    /* @ngInject */
    constructor() {
      console.log("SandboxController loaded");

      this.message = "Hello";
    }
  }
}
