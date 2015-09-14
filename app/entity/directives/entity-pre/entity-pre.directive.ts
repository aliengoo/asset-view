"use strict";


module av.entity {

  export function entityPre(): angular.IDirective {
    return {
      restrict: "E",
      scope: {
        entity: "="
      },
      template: "<pre>{{entity | json}}</pre>"
    };
  }
}
