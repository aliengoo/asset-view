///<reference path="../../typings/tsd.d.ts"/>

///<reference path="home.config.ts"/>
///<reference path="home.controller.ts"/>
///<reference path="home.service.ts"/>

module av.home {

  angular.module("av.home", ["ui.router", "av.templates"])
    .controller("HomeController", HomeController)
    .service("homeService", HomeService)
    .config(HomeConfig);
}
