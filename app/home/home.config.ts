///<reference path="../../typings/tsd.d.ts"/>

module av.home {
  export class HomeConfig {

    // @ngInject
    constructor(private $stateProvider:angular.ui.IStateProvider) {

      $stateProvider.state(<angular.ui.IState>{
        name: "home",
        url: "/home",
        controller: "HomeController as vm",
        templateUrl: "home/home.html"
      });
    }
  }
}

