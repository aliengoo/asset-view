module atd.home {
  export class HomeController {

    public message: string;

    /* @ngInject */
    constructor() {
      var vm = this;

      vm.message = "Hello, World";
    }
  }
}
