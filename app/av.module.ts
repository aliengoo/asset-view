///<reference path="../typings/tsd.d.ts"/>

///<reference path="av.controller.ts"/>
///<reference path="av.config.ts"/>

///<reference path="home/home.module.ts"/>


module av {

  var dependencies:Array<string> = [
    "ui.router",
    "av.home"];

  angular.module("av", dependencies)
    .controller("AvController", AvController)
    .config(AvConfig);
}
