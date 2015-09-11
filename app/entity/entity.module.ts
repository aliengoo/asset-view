///<reference path="../../typings/tsd.d.ts"/>

///<reference path="entity.controller.ts"/>
///<reference path="./find/entity-find.controller.ts"/>
///<reference path="./find/entity-find.config.ts"/>
///<reference path="./create/entity-create.controller.ts"/>
///<reference path="./view/entity-view.controller.ts"/>
///<reference path="./view/entity-view.config.ts"/>
///<reference path="./edit/entity-edit.controller.ts"/>

///<reference path="entity.service.ts"/>
///<reference path="entity.config.ts"/>


"use strict";

module av.entity {
  angular.module("av.entity", ["ui.router", "av.templates"])
    .controller("EntityController", EntityController)
    .config(EntityConfig)
    .controller("EntityCreateController", EntityCreateController)
    .config(EntityCreateConfig)
    .controller("EntityEditController", EntityEditController)
    .config(EntityEditConfig)
    .controller("EntityFindController", EntityFindController)
    .config(EntityFindConfig)
    .service("entityService", EntityService)
    .controller("EntityViewController", EntityViewController)
    .config(EntityViewConfig);

}

