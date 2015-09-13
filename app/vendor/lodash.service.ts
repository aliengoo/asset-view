///<reference path="..\..\typings\tsd.d.ts"/>
"use strict";

module av.vendor {
  /* @ngInject */
  export function lodashService($window:angular.IWindowService): _.LoDashStatic {
    return $window["lodash"]
  }
}