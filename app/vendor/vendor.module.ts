///<reference path="../../typings/tsd.d.ts"/>
///<reference path="jquery.service.ts"/>
///<reference path="lodash.service.ts"/>
///<reference path="gsap.service.ts"/>

module av.vendor {
  angular.module("av.vendor", [])
    .service("$", jQueryService)
    .service("_", lodashService)
    .service("gsapService", gsapService);
}