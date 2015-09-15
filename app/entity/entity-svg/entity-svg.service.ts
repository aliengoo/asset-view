///<reference path="../../../typings/tsd.d.ts"/>
///<reference path="..\entity.ts"/>

"use strict";

module av.entity {

  export interface IEntitySvgService {
    render(entity:IEntity, startingPoint:av.canvas.IPoint):void;
  }

  export class EntitySvgService implements IEntitySvgService{

    private ce:av.canvas.ICanvasEngine;

    // each entity has it's own set
    private set:RaphaelSet;

    private line:av.canvas.ILine = {
      width:0.5,
      style:"black"
    };


    private fontFamily:string = '"Helvetica Neue", Helvetica, Arial, sans-serif';
    private headerFont:av.canvas.IFont;
    private entityNameMaxWidth:number = 150;
    private normalFont:av.canvas.IFont;
    private iconSize:av.canvas.ISize = {
      width: 40,
      height: 40
    };

    private padding:number = 5;

    /* @ngInject */
    constructor(
      canvasEngine:av.canvas.ICanvasEngine,
      private _:_.LoDashStatic,
      private icomoonService:av.common.IcomoonService) {

      this.ce = canvasEngine;
      this.set = this.ce.paper.set();

      this.headerFont = {
        family: this.fontFamily,
        size: 16
      };

      this.normalFont = {
        family: this.fontFamily,
        size: 12
      };
    }

    render(entity:IEntity, startingPoint:av.canvas.IPoint):void {
      var nameWidth = Math.max(this.ce.getTextWidth(entity.name, this.headerFont), this.entityNameMaxWidth);
      var width = nameWidth + this.iconSize.width + (this.padding * 2);

      var size:av.canvas.ISize = {
        width: width,
        height: 300
      };

      var entityElement = this.ce.drawRect(startingPoint, size, this.line);

      // render name
      var textRelativePosition:av.canvas.IPoint = {
        x: this.padding,
        y: this.padding
      };

      var textElement = this.ce.drawTextWithinParent(
        entityElement,
        textRelativePosition,
        entity.name,
        this.headerFont, nameWidth);

      // render icon
      this.icomoonService.get().then((icomoonIcons:av.common.IcomoonIcon[]) => {
        var icomoonIcon = _.find(icomoonIcons, (ii) => {
          icomoonIcon = ii;
        });

        var imageElement = this.ce.drawImageWithinParent(entityElement, icomoonIcon.svgPath, {
          x: nameWidth + this.padding,
          y: this.padding
        }, this.iconSize);

        this.set.push(entityElement);
        this.set.push(textElement);
        this.set.push(imageElement);

        this.ce.draggable(this.set);
      });
    }
  }
}
