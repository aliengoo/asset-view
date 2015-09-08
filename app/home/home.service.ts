///<reference path="../../typings/angularjs/angular.d.ts"/>

module atd.home {

  export interface IHomeService {
    sayHello(name: string): string;
  }

  export class HomeService implements IHomeService{
    sayHello(name:string):string {
      return "Hello, " + name;
    }
  }
}


