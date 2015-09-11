///<reference path="../typings/tsd.d.ts"/>

///<reference path="av.controller.ts"/>
///<reference path="av.config.ts"/>

///<reference path="home/home.module.ts"/>
///<reference path="entity/entity.module.ts"/>
///<reference path="common/common.module.ts"/>
///<reference path="av.run.ts"/>



module av {

  var dependencies:Array<string> = [
    "ui.router",
    "av.home",
    "av.common",
    "av.entity"];

  angular.module("av", dependencies)
    .controller("AvController", AvController)
    .run(avRun)
    .config(AvConfig);
}
