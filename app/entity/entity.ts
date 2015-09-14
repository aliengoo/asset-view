"use strict";

module av.entity {

  export interface IEntity {
    name:string;
    classification:string
    uri?:string;
    labels?:[string];
    description:string;
    meta?:any
  }
}
