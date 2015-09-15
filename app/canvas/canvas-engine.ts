///<reference path="../../typings/tsd.d.ts"/>


///<reference path="point.ts"/>
"use strict";

module av.canvas {

  export interface ICanvasEngine {
    paper:RaphaelPaper;
    drawSquareWithinParent(parentElement:RaphaelElement, size:number, line?:ILine, relativePosition?:IPoint):RelativeRaphaelElement;
    drawSquare(startPoint:IPoint, size:number, line?:ILine, relativePosition?:IPoint):RelativeRaphaelElement;

    drawTextWithinParent(parentElement:RaphaelElement, relativePosition:IPoint, text:string):RelativeRaphaelElement;

    draggable(set:RaphaelSet): RaphaelSet;
  }

  export interface RelativeRaphaelElement extends RaphaelElement {
    parentElement?:RelativeRaphaelElement;
    relativePosition?:IPoint;
  }

  export class CanvasEngine implements ICanvasEngine {
    public paper:RaphaelPaper;

    constructor(containerId:string, size:ISize) {
      this.paper = Raphael(containerId, size.width, size.height);
    }



    draggable(set:RaphaelSet):RaphaelSet {

      function start(x:number, y:number, event:DragEvent):any {
        this.ox = this.attr("x");
        this.oy = this.attr("y");
      }

      function move(dx:number, dy:number, x:number, y:number, event:DragEvent):any {
        var mx = this.ox + dx;
        var my = this.oy + dy;

        var targetAttr = {
          x: mx,
          y: my
        };

        this.attr(targetAttr);

        var that = this;

        set.forEach((el:RaphaelElement) => {

          var rel = <RelativeRaphaelElement>el;

          if (rel !== that) {

            var ix:number, iy:number;

            if (rel.parentElement === that) {
              if (rel.relativePosition) {

                // move relative to the element
                ix = mx + rel.relativePosition.x;
                iy = my + rel.relativePosition.y;

                rel.attr({
                  x: ix,
                  y: iy
                });
              }
            } else {
              // must be a child element
              ix = mx - that.relativePosition.x;
              iy = my - that.relativePosition.y;

              that.parentElement.attr({
                x: ix,
                y: iy
              });

            }
          }
        });
      }

      function end(DragEvent:any):any {
      }


      set.drag(move, start, end);

      return set;
    }

    drawTextWithinParent(parentElement:RaphaelElement, relativePosition:IPoint, text:string):RelativeRaphaelElement {

      var textElement:RelativeRaphaelElement;

      textElement = this.paper.text(
        parentElement.attr("x") + relativePosition.x,
        parentElement.attr("y") + relativePosition.y,
        text);

      textElement.relativePosition = relativePosition;
      textElement.parentElement = parentElement;

      return textElement;
    }

    drawSquareWithinParent(parentElement:RaphaelElement, size:number, line?:ILine, relativePosition?:IPoint):RelativeRaphaelElement {

      var element = this.drawSquare({
        x: parentElement.attr("x"),
        y: parentElement.attr("y")
      },
        size,
        line,
        relativePosition);

      element.parentElement = parentElement;

      return element;
    }

    drawSquare(startPoint:IPoint, size:number, line?:ILine, relativePosition?:IPoint):RelativeRaphaelElement {

      var square:RelativeRaphaelElement;

      if (relativePosition) {
        square = this.paper.rect(startPoint.x + relativePosition.x, startPoint.y + relativePosition.y, size, size);
        square.relativePosition = relativePosition;
      } else {
        square = this.paper.rect(startPoint.x, startPoint.y, size, size);
      }

      if (line) {
        square.attr({
          stroke: line.style || "black",
          "stroke-width": line.width || 1,
          "fill": "white"
        });
      }


      return square;
    }
  }
}
