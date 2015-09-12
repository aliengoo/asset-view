///<reference path="../../typings/tsd.d.ts"/>

///<reference path="entity.controller.ts"/>

///<reference path="entity.service.ts"/>

///<reference path="entity.config.ts"/>
///<reference path="./find/entity-find.config.ts"/>
///<reference path="./create/entity-create.config.ts"/>
///<reference path="./view/entity-view.config.ts"/>
///<reference path="./edit/entity-edit.config.ts"/>

"use strict";

module av.entity {
  angular.module("av.entity", ["ui.router", "av.templates"])
    .service("entityService", EntityService)
    .config(EntityConfig)
    .config(EntityFindConfig)
    .config(EntityEditConfig)
    .config(EntityCreateConfig)
    .config(EntityViewConfig)
}

