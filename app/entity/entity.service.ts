///<reference path="entity.ts"/>

///<reference path="entity-result.ts"/>


"use strict";

module av.entity {

  export interface IEntityService {
    save(entity:IEntity): IEntityResult;

    delete(entityName:string): IEntityResult;

    find(entityName)
  }
}


