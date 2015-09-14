///<reference path="../typings/tsd.d.ts"/>

///<reference path="av.controller.ts"/>
///<reference path="av.config.ts"/>

///<reference path="home/home.module.ts"/>
///<reference path="entity/entity.module.ts"/>
///<reference path="common/common.module.ts"/>
///<reference path="av.run.ts"/>
///<reference path="av.run-with-fake-backend.ts"/>
///<reference path="sandbox\sandbox.config.ts"/>

module av {


  var dependencies:Array<string> = [
    "ui.router",
    "ngMockE2E",
    "av.home",
    "av.common",
    "av.entity"];

  var mod = angular.module("av", dependencies);

  // controllers
  mod.controller("AvController", AvController);

  // run
  // fakeBackend is enabled with --fakeBackend
  if ((<any>window).fakeBackend === true) {
    mod.run(avRunWithFakeBackend);
  } else {
    mod.run(avRun);
  }

  // config
  mod.config(AvConfig);
  mod.config(SandboxConfig);
}
