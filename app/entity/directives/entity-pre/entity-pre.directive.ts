"use strict";


module av.entity {

  export function entityPre(): angular.IDirective {
    return {
      restrict: "E",
      scope: {
        entity: "="
      },
      template: "<pre class='directive'>{{entity | json}}</pre>"
    };
  }
}
