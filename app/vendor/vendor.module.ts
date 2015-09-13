///<reference path="../../typings/tsd.d.ts"/>
///<reference path="jquery.service.ts"/>
///<reference path="lodash.service.ts"/>

module av.vendor {
  angular.module("av.vendor", [])
    .factory("$", jQueryService)
    .factory("_", lodashService);
}