///<reference path="../../../typings/tsd.d.ts"/>
///<reference path="../entity.service.ts"/>
///<reference path="../../vendor/vendor.module.ts"/>

"use strict";

module av.entity {

  /* @ngInject */
  export function entityFindInput(entityService:av.entity.IEntityService,
                                  $:JQueryStatic):angular.IDirective {
    return <angular.IDirective>{
      restrict: "A",

      link: (scope:any,
             element:angular.IAugmentedJQuery):void => {

        var options = {
          minLength: 2,
          display: "name",
          items: 10,
          source: function (query:string, cb:Function) {
            entityService.search(query).then(function (data:any[]) {
              cb(data);
            });
          }
        };

        $(element).typeahead(options);
      }
    };
  }
}