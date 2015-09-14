///<reference path="../../../../typings/tsd.d.ts"/>
///<reference path="../../entity.ts"/>
///<reference path="../../../vendor/gsap.service.ts"/>


"use strict";

module av.entity {

  export interface IcomoonIcon {
    className: string;
    hexCode: string;
    niceName: string;
  }

  interface EntityIconSelectScope extends angular.IScope {
    icons?: IcomoonIcon[],
    entity: IEntity,
    search?: string,
    hasFocus: boolean
  }

  /* @ngInject */
  export function entityIconSelect($http:angular.IHttpService,
                                   $compile:angular.ICompileService,
                                   $sessionStorage:any,
                                   $:JQueryStatic):angular.IDirective {
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

      function callback(icons:IcomoonIcon[]):void {
        scope.icons = icons;

        var newElement = $(
          `<span ng-repeat='icon in filteredIcons = (icons | filter:search)'>
            <i ng-class='icon.className' ng-click='entity.icon = icon.className' title="{{icon.niceName}}"></i>
          </span>`);

        $icons.append(newElement);
        $compile(newElement)(scope);

        $sessionStorage.icomoon = icons;
      }

      scope.icons = $sessionStorage.icoomoon;

      if (!scope.icons) {
        var config = <angular.IRequestShortcutConfig> {
          cache: true
        };

        $http.get("assets/icomoon.json", config).success(callback);
      }
    }
  }
}