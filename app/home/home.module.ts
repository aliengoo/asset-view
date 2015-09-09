///<reference path="../../typings/tsd.d.ts"/>

///<reference path="home.config.ts"/>
///<reference path="home.controller.ts"/>
///<reference path="home.service.ts"/>

module atd.home {

  angular.module("atd.home", ["ui.router", "atd.templates"])
    .controller("HomeController", HomeController)
    .service("homeService", HomeService)
    .config(HomeConfig);
}
