"use strict";

module av.entity {
  export function entityResults(): angular.IDirective {
    return {
      restrict: "E",
      scope: {
        entities: '='
      },
      templateUrl: "entity/directives/entity-results/entity-results.directive.html",
      link: link
    };

    function link(scope:angular.IScope, element:angular.IAugmentedJQuery) {

    }
  }
}