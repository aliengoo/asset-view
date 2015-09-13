///<reference path="..\..\typings\tsd.d.ts"/>
"use strict";

module av.vendor {
  /* @ngInject */
  export function jQueryService($window:angular.IWindowService): JQueryStatic {
   return $window["jQuery"]
  }
}