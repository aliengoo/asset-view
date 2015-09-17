"use strict";

module av.entity {

  export interface IEntityLink {

    lhs:IEntity;

    rhs:IEntity;

    // the adjective
    link:IEntity;
    description:string;
  }
}

