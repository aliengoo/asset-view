///<reference path="../../../../typings/tsd.d.ts"/>


"use strict";

module av.entity {

  export function entityFind(): angular.IDirective {
    return {
      restrict: "E",
      templateUrl: "entity/directives/entity-find/entity-find.directive.html",
      link: link
    };

    function link(scope:angular.IScope, element:angular.IAugmentedJQuery) {

    }
  }

}
