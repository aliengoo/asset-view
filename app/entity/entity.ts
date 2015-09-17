"use strict";

module av.entity {

  export interface IEntity {
    _id?:string,
    name?:string;
    classification?:string
    uri?:string;
    labels?:[string];
    description?:string;
    icon?:string,
    meta?:any
  }
}
