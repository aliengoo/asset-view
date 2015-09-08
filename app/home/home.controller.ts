///<reference path="home.service.ts"/>


module atd.home {
  export class HomeController {

    public message: string;

    /* @ngInject */
    constructor(homeService:IHomeService) {
      var vm = this;

      vm.message = homeService.sayHello("World");
    }
  }
}
