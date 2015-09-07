///<reference path="../../typings/angularjs/angular.d.ts"/>
///<reference path="../../typings/angular-ui-router/angular-ui-router.d.ts"/>
///<reference path="home.config.ts"/>
///<reference path="home.controller.ts"/>

module atd.home {

  angular.module("atd.home", ["ui.router", "atd.templates"])
    .controller("HomeController", HomeController)
    .config(HomeConfig);

}
