///<reference path="../../../../typings/tsd.d.ts"/>
///<reference path="../../entity.ts"/>
///<reference path="../../../common/common.module.ts"/>

"use strict";

module av.entity {

  interface EntityIconSelectScope extends angular.IScope {
    icons?: av.common.IcomoonIcon[],
    entity: IEntity,
    search?: string,
    hasFocus: boolean
  }

  /* @ngInject */
  export function entityIconSelect($http:angular.IHttpService,
                                   $compile:angular.ICompileService,
                                   $:JQueryStatic,
                                   icomoonService:av.common.IIcomoonService):angular.IDirective {
    return {
      restrict: "E",
      templateUrl: "entity/directives/entity-icon-select/entity-icon-select.directive.html",
      scope: {
        entity: "="
      },
      link: link
    };

    function link(scope:EntityIconSelectScope, element:angular.IAugmentedJQuery):void {
      var $icons = $(element).find("#icons");

      icomoonService.getAll().then((icons) => {
        scope.icons = icons;

        var newElement = $(
          `<span ng-repeat='icon in filteredIcons = (icons | filter:search)'>
            <i ng-class='icon.className' ng-click='entity.icon = icon.className' title="{{icon.niceName}}"></i>
          </span>`);

        $icons.append(newElement);
        $compile(newElement)(scope);
      });
    }
  }
}