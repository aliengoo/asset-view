///<reference path="../typings/tsd.d.ts"/>
"use strict";

module av {
  /* @ngInject */
  export function avRun($window:angular.IWindowService,
                        $httpBackend:angular.IHttpBackendService) {
    if ($window["fakeBackend"] !== true) {
      return;
    }

    var fakeEntities = [{
      _id: "an_entity",
      name: "container"
    }, {
      _id: "an_server",
      name: "server1"
    }, {
      _id: "an_team",
      name: "team1"
    }];

    $httpBackend.whenGET("api/entity/adjectives").respond(200, fakeEntities);
    $httpBackend.whenGET(/api\/entity\?*/).respond(200, fakeEntities);

  }
}
