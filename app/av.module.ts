///<reference path="../typings/tsd.d.ts"/>

///<reference path="av.controller.ts"/>
///<reference path="av.config.ts"/>

///<reference path="home/home.module.ts"/>
///<reference path="entity/entity.module.ts"/>
///<reference path="common/common.module.ts"/>
///<reference path="av.run.ts"/>
///<reference path="av.run-with-fake-backend.ts"/>
///<reference path="sandbox\sandbox.config.ts"/>
///<reference path="canvas/canvas.module.ts"/>
///<reference path="sandbox\sandbox.controller.ts"/>


module av {


  var dependencies:Array<string> = [
    "ngAria",
    "ngAnimate",
    "ngMessages",
    "ngMockE2E",
    "ui.router",
    "av.common",
    "av.canvas",
    "av.home",
    "av.entity"
  ];

  var mod = angular.module("av", dependencies);

  // controllers
  mod.controller("AvController", AvController);
  mod.controller("SandboxController", SandboxController);

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
