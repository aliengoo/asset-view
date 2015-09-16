///<reference path="../../../typings/tsd.d.ts"/>
///<reference path="../../vendor/vendor.module.ts"/>
///<reference path="icomoon-icon.ts"/>


"use strict";

module av.common {

  export interface IIcomoonService {
    getAll():angular.IPromise<IcomoonIcon[]>;
    findByClassName(className:string):angular.IPromise<IcomoonIcon>;
  }

  export class IcomoonService implements IIcomoonService{

    private icomoonIcons:IcomoonIcon[];

    /* @ngInject */
    constructor(private $q:angular.IQService,
                private $http:angular.IHttpService,
                private $sessionStorage:any,
                private _:_.LoDashStatic) {

      this.icomoonIcons = $sessionStorage.icomoon;
    }

    getAll():angular.IPromise<IcomoonIcon[]> {
      var defer = this.$q.defer();

      var me = this;

      function callback(icons:IcomoonIcon[]) {
        me.$sessionStorage.icomoon = icons;
        defer.resolve(icons);
      }

      if (me.icomoonIcons) {
        defer.resolve(me.icomoonIcons);
      }
      else {
        var config = <angular.IRequestShortcutConfig> {
          cache: true
        };

        me.$http.get("assets/icomoon.json", config).success(callback).error(() => {
          defer.reject();
        });
      }

      return defer.promise;
    }

    findByClassName(className:string): angular.IPromise<IcomoonIcon> {
      var me = this;

      var defer = me.$q.defer();

      me.getAll().then((icons:IcomoonIcon[]) => {
        var match = me._.find(icons, (icon:IcomoonIcon) => icon.className === className);

        defer.resolve(match);
      });

      return defer.promise;
    }
  }
}
