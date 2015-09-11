///<reference path="home.service.ts"/>


module av.home {
  export class HomeController {

    public message: string;

    /* @ngInject */
    constructor(homeService:IHomeService) {
      var vm = this;

      vm.message = homeService.sayHello("World");
    }
  }
}
