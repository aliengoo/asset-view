///<reference path="../typings/tsd.d.ts"/>
"use strict";

module av {
  /* @ngInject */
  export function avRunWithFakeBackend($window:angular.IWindowService,
                        $httpBackend:angular.IHttpBackendService) {
    if ($window["fakeBackend"] !== true) {
      return;
    }

    var fakeEntities = [{
      _id: "an_entity",
      name: "container"
    }, {
      _id: "server1",
      name: "server1"
    },{
      _id: "server2",
      name: "server2"
    },{
      _id: "server3",
      name: "server3"
    },{
      _id: "server4",
      name: "server4"
    },{
      _id: "server5",
      name: "server5"
    }, {
      _id: "an_team",
      name: "team1"
    }];

    $httpBackend.whenGET("api/entity/adjectives").respond(200, fakeEntities);

    $httpBackend.whenGET("api/entity/123").respond(200, {
      _id: "123",
      name: "hqserver01p",
      icon: "icon-database",
      description: "server",
      uri:"hqserver01p",
      labels: ["this", "is", "a", "server"]
    });

    //$httpBackend.whenGET(/api\/entity\?*/).respond(200, fakeEntities);
    $httpBackend.whenGET("assets/icomoon.json").passThrough();

  }
}
