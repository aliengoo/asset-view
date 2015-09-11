///<reference path="../../typings/tsd.d.ts"/>

module av.home {

  export interface IHomeService {
    sayHello(name:string): string;

    sayHelloAsync(name:string): angular.IPromise<string>;
  }

  export class HomeService implements IHomeService {

    /* @ngInject */
    constructor(private $q:angular.IQService) {
    }

    sayHelloAsync(name:string):angular.IPromise<string> {

      var defer = this.$q.defer();

      if (angular.isDefined(name)) {
        defer.resolve("Hello (async), " + name);
      } else {
        defer.reject("Silly");
      }

      return defer.promise;
    }

    sayHello(name:string):string {


      return "Hello, " + name;
    }
  }
}


