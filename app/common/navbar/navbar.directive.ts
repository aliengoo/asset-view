///<reference path="../../../typings/tsd.d.ts"/>

"use strict";

module av.common {
  export function Navbar(): angular.IDirective {
    return <angular.IDirective>{
      restrict: "E",
      templateUrl: "common/navbar/navbar.directive.html"
    };
  }
}