///<reference path="../typings/tsd.d.ts"/>
"use strict";

module av {
  /* @ngInject */
  export function avRun($rootScope:angular.IRootScopeService) {


    $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error){
      console.log(error);
    });

    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
      console.log(event);
    });

    $rootScope.$on("$stateNotFound", function(event, unfoundState, fromState, fromParams){
      console.log(unfoundState.to); // "lazy.state"
      console.log(unfoundState.toParams); // {a:1, b:2}
      console.log(unfoundState.options); // {inherit:false} + default options
    });
  }
}
