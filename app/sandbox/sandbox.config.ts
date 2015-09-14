///<reference path="../../typings/tsd.d.ts"/>
///<reference path="sandbox.controller.ts"/>

"use strict";

module av {
  export class SandboxConfig {
    /* @ngInject */
    constructor($stateProvider:angular.ui.IStateProvider) {
      $stateProvider.state("sandbox", <angular.ui.IState>{
        url: "/sandbox",
        controller: SandboxController,
        controllerAs: "vm",
        templateUrl: "sandbox/sandbox.html"
      });
    }
  }
}