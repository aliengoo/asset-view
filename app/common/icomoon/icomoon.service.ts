///<reference path="../../../typings/tsd.d.ts"/>


"use strict";

module av.common {

  export class IcomoonService {

    private icomoonIcons:IcomoonIcon[];

    /* @ngInject */
    constructor(private $q:angular.IQService,
                private $http:angular.IHttpService,
                private $sessionStorage:any) {

      this.icomoonIcons = $sessionStorage.icomoon;
    }

    get():angular.IPromise<IcomoonIcon[]> {
      var defer = this.$q.defer();

      function callback(icons:IcomoonIcon[]) {
        this.$sessionStorage.icomoon = icons;
        defer.resolve(icons);
      }

      if (this.icomoonIcons) {
        defer.resolve(this.icomoonIcons);
      }
      else {
        var config = <angular.IRequestShortcutConfig> {
          cache: true
        };

        this.$http.get("assets/icomoon.json", config).success(callback).error(() => {
          defer.reject();
        });
      }

      return defer.promise;
    }
  }

}
