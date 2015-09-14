///<reference path="..\..\typings\tsd.d.ts"/>
"use strict";

module av.vendor {
  /* @ngInject */
  export function gsapService($window:angular.IWindowService): TweenMax {
    return $window["TweenMax"];
  }
}