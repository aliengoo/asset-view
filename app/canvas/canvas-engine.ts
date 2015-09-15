///<reference path="../../typings/tsd.d.ts"/>


///<reference path="point.ts"/>
"use strict";

module av.canvas {

  export interface ICanvasEngine {
    paper:RaphaelPaper;
    drawRectWithinParent(parentElement:RaphaelElement, size:ISize, line?:ILine, relativePosition?:IPoint):RelativeRaphaelElement;
    drawRect(startPoint:IPoint, size:ISize, line?:ILine, relativePosition?:IPoint):RelativeRaphaelElement;

    drawTextWithinParent(parentElement:RaphaelElement, relativePosition:IPoint, text:string, font:IFont, maxWidth?:number):RelativeRaphaelElement;

    drawImageWithinParent(parentElement:RaphaelElement, url:string, relativePosition:IPoint, size:ISize):RelativeRaphaelElement;

    getTextWidth(text:string, font:IFont): number;

    draggable(set:RaphaelSet): RaphaelSet;
  }

  export interface RelativeRaphaelElement extends RaphaelElement {
    parentElement?:RelativeRaphaelElement;
    relativePosition?:IPoint;
  }

  export class CanvasEngine implements ICanvasEngine {
    public paper:RaphaelPaper;

    private textRuler:RaphaelElement;

    constructor(containerId:string, size:ISize) {
      this.paper = Raphael(containerId, size.width, size.height);
      this.textRuler = this.paper.text(-10000, -10000, "").attr({
        "fill": "none",
        "stroke": "none"
      });
    }

    getTextWidth(text:string, font:IFont): number{
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

    drawTextWithinParent(parentElement:RaphaelElement, relativePosition:IPoint, text:string, font:IFont, maxWidth?:number):RelativeRaphaelElement {

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

      for(var i = 0; i < words.length; i++) {
        textElement.attr("text", temp + " " + words[i]);

        if (textElement.getBBox().width > maxWidth) {
          temp += "\n" + words[i];
        } else {
          temp += " " + words[i];
        }
      }

      textElement.attr("text", temp.substring(1));

      // fix position, coordinates relate to the
      // center of the binding box, this corrects that to the top left
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
