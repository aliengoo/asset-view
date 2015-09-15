///<reference path="../../typings/tsd.d.ts"/>

///<reference path="entity.controller.ts"/>

///<reference path="entity.service.ts"/>

///<reference path="entity.config.ts"/>
///<reference path="./find/entity-find.config.ts"/>
///<reference path="./create/entity-create.config.ts"/>
///<reference path="./view/entity-view.config.ts"/>
///<reference path="./edit/entity-edit.config.ts"/>
///<reference path="entity-link.service.ts"/>
///<reference path="find\entity-find-input.directive.ts"/>

///<reference path="../vendor/vendor.module.ts"/>
///<reference path="directives\classification-select\classification-select.directive.ts"/>
///<reference path="directives\description-textarea\description-textarea.directive.ts"/>
///<reference path="directives\name-input\name-input.directive.ts"/>
///<reference path="directives\labels-input\labels-input.directive.ts"/>
///<reference path="directives\uri-input\uri-input.directive.ts"/>
///<reference path="directives\entity-pre\entity-pre.directive.ts"/>
///<reference path="directives\entity-mini\entity-mini.directive.ts"/>
///<reference path="directives\entity-icon-select\entity-icon-select.directive.ts"/>
///<reference path="directives\entity-labels\entity-labels.directive.ts"/>

"use strict";

module av.entity {
  var mod =  angular.module("av.entity", [
    "ui.router",
    "ngStorage",
    "av.templates",
    "av.vendor"]);

  // services
  mod.service("entityService", EntityService)
    .service("entityLinkService", EntityLinkService)
    .service("entitySvgService", EntitySvgService);

  // controllers
  mod.controller("EntityController", EntityController);

  // directives
  mod.directive("entityFindInput", entityFindInput)
    .directive("classificationSelect", classificationSelect)
    .directive("descriptionTextarea", descriptionTextarea)
    .directive("entityIconSelect", entityIconSelect)
    .directive("entityLabels", entityLabels)
    .directive("entityMini", entityMini)
    .directive("entityPre", entityPre)
    .directive("labelsInput", labelsInput)
    .directive("nameInput", nameInput)
    .directive("uriInput", uriInput);

  // config
  mod.config(EntityConfig)
    .config(EntityFindConfig)
    .config(EntityEditConfig)
    .config(EntityCreateConfig)
    .config(EntityViewConfig);

  // run
  // TODO: No runs currently
}

