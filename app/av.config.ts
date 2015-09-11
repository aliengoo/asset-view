///<reference path="../typings/tsd.d.ts"/>

module av {
  export class AvConfig {
    // @ngInject
    constructor(
      private $urlRouterProvider: angular.ui.IUrlRouterProvider,
      private $httpProvider: any){

      this.$urlRouterProvider.otherwise('/home');

      // enable CORS
      this.$httpProvider.defaults.useXDomain = true;
      delete this.$httpProvider.defaults.headers.common['X-Requested-With'];
    }
  }
}
