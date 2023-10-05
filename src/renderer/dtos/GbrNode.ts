//
//  GbrNode.ts
//
//  Created by Lars Rothaus on 02/10/2023.
//  Copyright © 02/10/2023 Lars Rothaus. All rights reserved.
//

import { Point2D } from "./Point2D";
import { LineVector } from "./LineVector";
export enum GbrNodeType {
  ToolUp = 'ToolUp',
  ToolDown = 'ToolDown'
}
export class GbrNode {
    public points:Point2D[] = [];
    public type:GbrNodeType;
    public refId:string = ''

    public startEndVectors:LineVector = {
      start: {x:0,y:0},
      end: {x:0,y:0}
    }

    constructor() {
      this.type = GbrNodeType.ToolDown
    }

    public addPoint(point:Point2D):void {
      this.points.push(point);
    }


    public close():void {
      this.startEndVectors.start = this.points[0];
      this.startEndVectors.end = this.points[this.points.length-1];
    }



 }
