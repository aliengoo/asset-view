///<reference path="../../typings/angularjs/angular.d.ts"/>

///<reference path="atd.controller.ts"/>
///<reference path="atd.config.ts"/>

///<reference path="../home/home.module.ts"/>


module atd {

  var dependencies:Array<string> = [
    "ui.router",
    "atd.home"];

  angular.module("atd", dependencies)
    .controller("AtdController", AtdController)
    .config(AtdConfig);
}
