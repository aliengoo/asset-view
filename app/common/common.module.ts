///<reference path="navbar/navbar.directive.ts"/>
///<reference path="../vendor/jquery.service.ts"/>
///<reference path="icomoon\icomoon.service.ts"/>

"use strict";

module av.common {
  angular.module("av.common", ["av.common"])
    .directive("navbar", Navbar)
    .service("icomoonService", IcomoonService);
}

