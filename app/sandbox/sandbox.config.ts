///<reference path="../../typings/tsd.d.ts"/>
///<reference path="sandbox.controller.ts"/>

"use strict";

module av {
  export class SandboxConfig {
    /* @ngInject */
    constructor($stateProvider:angular.ui.IStateProvider) {
      $stateProvider.state("sandbox", <angular.ui.IState>{
        url: "/sandbox",
        controller: "SandboxController as vm",
        template: `<div class=\"col-sm-12\">
          <header class=\"text-center\">
            <h1>Sandbox - not for public consumption</h1>
          </header>
          <div><p ng-bind="{{2+2}}"></p></div></div>`
      });
    }
  }
}