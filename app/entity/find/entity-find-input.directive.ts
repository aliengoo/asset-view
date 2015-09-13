///<reference path="..\..\..\typings\tsd.d.ts"/>
///<reference path="..\entity.service.ts"/>

"use strict";

module av.entity {

  /* @ngInject */
  export function entityFindInput(entityService:av.entity.IEntityService,
                                  $:JQueryStatic,
                                  _:_.LoDashStatic):angular.IDirective {
    return <angular.IDirective>{
      restrict: "A",

      link: (scope:any,
             element:angular.IAugmentedJQuery):void => {

        element.addClass("typeahead");


        var options:Twitter.Typeahead.Options = {
          minLength: 2,
          highlight: true
        };

        var dataset:Twitter.Typeahead.Dataset = {
          display: "name",
          limit: 10,
          template: {
            empty: "<p>No matching entities found</p>",
            suggestion: function(data:any){
              return `<p><strong>${data.value} was found</p>`;
            }
          },
          source: function (query:string, cb:Function) {
            entityService.search(query).then(function (data:any[]) {

              cb(data);
            });
          }
        };

        $(element).typeahead(options, dataset);
      }
    };
  }
}