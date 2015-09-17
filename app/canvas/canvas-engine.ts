///<reference path="../../typings/tsd.d.ts"/>
///<reference path="./point.ts"/>
///<reference path="./line.ts"/>
///<reference path="./size.ts"/>
///<reference path="./font.ts"/>

"use strict";

module av.canvas {
  export interface ICanvasEngine {
    paper:RaphaelPaper;
    drawRectWithinParent(parentElement:RaphaelElement, size:ISize, line?:ILine, relativePosition?:IPoint):RelativeRaphaelElement;
    drawRect(startPoint:IPoint, size:ISize, line?:ILine, relativePosition?:IPoint):RelativeRaphaelElement;

    drawText(parentElement:RaphaelElement, relativePosition:IPoint, text:string, font:IFont, maxWidth?:number):RelativeRaphaelElement;

    drawImageWithinParent(parentElement:RaphaelElement, url:string, relativePosition:IPoint, size:ISize):RelativeRaphaelElement;

    getTextWidth(text:string, font:IFont): number;

    draggable(rootElement:RelativeRaphaelElement, set:RaphaelSet, onMove?:(point:IPoint) => void): RaphaelSet;
  }

  export interface RelativeRaphaelElement extends RaphaelElement {
    parentElement?:RelativeRaphaelElement;
    relativePosition?:IPoint;
  }

  export class CanvasEngine implements ICanvasEngine {
    public paper:RaphaelPaper;
    public container:HTMLElement;

    private textRuler:RaphaelElement;

    constructor(containerId:string) {

      this.container = document.getElementById(containerId);
      // there is no overload for this call
      this.paper = (<any>Raphael)(containerId, "100%", "100%");
      this.textRuler = this.paper.text(-10000, -10000, "").attr({
        "fill": "none",
        "stroke": "none"
      });
    }

    getTextWidth(text:string, font:IFont):number {
      this.textRuler.attr({
        "text": text,
        "font-family": font.family,
        "font-size": font.size
      });

      var bb = this.textRuler.getBBox();

      return bb.width;
    }


    drawImageWithinParent(parentElement:RaphaelElement, url:string, relativePosition:IPoint, size:ISize):av.canvas.RelativeRaphaelElement {

      var image:RelativeRaphaelElement;

      image = this.paper.image(url,
        parentElement.attr("x") + relativePosition.x,
        parentElement.attr("y") + relativePosition.y,
        size.width,
        size.height);

      image.parentElement = parentElement;
      image.relativePosition = relativePosition;

      return image;
    }


    private getRootElement(rre:RelativeRaphaelElement):RelativeRaphaelElement {

      if (rre.parentElement) {
        return this.getRootElement(rre.parentElement);
      }

      return rre;
    }

    private isInBounds(point:IPoint, size:ISize):boolean {
      var me = this;

      // left and top
      if (point.x < 0 || point.y < 0) {
        return false;
      }

      // right and bottom
      if (point.x + size.width > me.container.offsetWidth || point.y + size.height > me.container.offsetHeight) {
        return false;
      }

      return true;
    }

    draggable(rootElement:RelativeRaphaelElement, set:RaphaelSet, onMove?:(point:IPoint) => void):RaphaelSet {

      var me = this;

      // super useful when dragging - it means that the root element picks up the drag event
      rootElement.toFront();
      rootElement.attr({
        "fill-opacity": 0
      });

      var bb = rootElement.getBBox();

      function start(x:number, y:number, event:DragEvent):any {
        var target = this;

        // origin
        this.ox = target.attr("x");
        this.oy = target.attr("y");
      }

      /**
       * To work correctly, this requires that the rootElement it at the front, and that
       * @param dx
       * @param dy
       * @param x
       * @param y
       * @param event
       */
      function move(dx:number, dy:number, x:number, y:number, event:DragEvent):any {

        var target = this;

        // calculate new point based on the origin and movement
        var mx = this.ox + dx;
        var my = this.oy + dy;

        var targetPoint = {
          x: mx,
          y: my
        };

        if (onMove) {
          onMove(targetPoint);
        }

        if (me.isInBounds(targetPoint, {
            width: bb.width,
            height: bb.height
          })) {
          console.log("in bounds");
          target.attr(targetPoint);
          set.forEach((el:RaphaelElement) => {

            var rre = <RelativeRaphaelElement>el;

            // the current element in the set is not the one being dragged
            if (rre !== target) {

              var ix:number, iy:number;

              // this is a child of the element being dragged
              // and must be repositioned relative to it
              if (rre.parentElement === target) {
                if (rre.relativePosition) {

                  // move relative to the element
                  ix = targetPoint.x + rre.relativePosition.x;
                  iy = targetPoint.y + rre.relativePosition.y;

                  rre.attr({
                    x: ix,
                    y: iy
                  });
                }
              } else {
                ix = mx - target.relativePosition.x;
                iy = my - target.relativePosition.y;

                target.parentElement.attr({
                  x: ix,
                  y: iy
                });
              }
            }
          });
        }
      }

      function end(DragEvent:any):any {
      }


      set.drag(move, start, end);

      return set;
    }

    drawText(parentElement:RaphaelElement, relativePosition:IPoint, text:string, font:IFont, maxWidth?:number):RelativeRaphaelElement {

      var textElement:RelativeRaphaelElement;

      textElement = this.paper.text(
        parentElement.attr("x") + relativePosition.x,
        parentElement.attr("y") + relativePosition.y,
        "").attr({
          "font-size": font.size,
          "font-family": font.family
        });

      // canvas doesn't understand word wrap...
      var words = text.split(" ");

      var temp = "";

      if (!maxWidth) {
        maxWidth = parentElement.getBBox().width - 5 - relativePosition.x;
      }

      if (words.length > 1) {
        for (var i = 0; i < words.length; i++) {
          textElement.attr("text", temp + " " + words[i]);

          if (textElement.getBBox().width > maxWidth) {
            temp += "\n" + words[i];
          } else {
            temp += " " + words[i];
          }
        }

        textElement.attr("text", temp.substring(1));
      } else {
        textElement.attr("text", text);
      }

      // fix position, coordinates relate to the
      // center of the binding box, this corrects me to the top left
      var bb = textElement.getBBox();

      textElement.transform(`t0,${Math.floor(bb.height / 2)}`);
      textElement.attr("text-anchor", "start");

      textElement.relativePosition = relativePosition;
      textElement.parentElement = parentElement;

      return textElement;
    }

    drawRectWithinParent(parentElement:RaphaelElement, size:ISize, line?:ILine, relativePosition?:IPoint):RelativeRaphaelElement {

      var element = this.drawRect({
          x: parentElement.attr("x"),
          y: parentElement.attr("y")
        },
        size,
        line,
        relativePosition);

      element.parentElement = parentElement;

      return element;
    }

    drawRect(startPoint:IPoint, size:ISize, line?:ILine, relativePosition?:IPoint):RelativeRaphaelElement {

      var square:RelativeRaphaelElement;

      if (relativePosition) {
        square = this.paper.rect(
          startPoint.x + relativePosition.x,
          startPoint.y + relativePosition.y,
          size.width,
          size.height);

        square.relativePosition = relativePosition;
      } else {
        square = this.paper.rect(
          startPoint.x,
          startPoint.y,
          size.width,
          size.height);
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
