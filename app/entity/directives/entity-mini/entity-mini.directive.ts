///<reference path="../../../../typings/tsd.d.ts"/>
///<reference path="..\..\entity.ts"/>


"use strict";

module av.entity {

  interface IEntityMiniScope {
    entity: IEntity
  }

  export function entityMini(): angular.IDirective {
    return {
      restrict: "E",
      scope: {
        entity: "="
      },
      templateUrl: "entity/directives/entity-mini/entity-mini.directive.html",
      link: (scope: IEntityMiniScope): void => {

        // TODO: Remove after testing.
        scope.entity = <IEntity>{
          classification: "noun",
          name: "hqwhatever01p",
          description: "Lorem ipsum dolor sit amet, assum nominavi et eam, cum no alia discere neglegentur, vel eu eros fugit dicit. Te placerat legendos voluptatum quo, et labore verear vel. In his veri idque saepe, simul nostrud delicata vis ea. Quod sententiae sit in, at nam liber tempor sententiae. An dico tota officiis sit, ei eleifend disputando eum. Ad conceptam consectetuer usu, no nam noster feugiat.",
          labels: ["this", "is", "a", "test"],
          uri: "http://www.gooogle.com"
        };
      }
    };
  }
}
