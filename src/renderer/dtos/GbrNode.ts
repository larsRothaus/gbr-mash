//
//  GbrNode.ts
//
//  Created by Lars Rothaus on 02/10/2023.
//  Copyright © 02/10/2023 Lars Rothaus. All rights reserved.
//

import { Point2D } from './Point2D';
import { LineVector } from './LineVector';

export enum GbrNodeType {
  ToolUp = 'ToolUp',
  ToolDown = 'ToolDown'
}

export class GbrNode {
  public points: Point2D[] = [];
  public type: GbrNodeType;
  public refId: string = '';
  public cuttingDirection:number = 1000;
  public startEndVectors: LineVector = {
    start: { x: 0, y: 0 },
    end: { x: 0, y: 0 }
  };


  constructor() {
    this.type = GbrNodeType.ToolDown;
  }

  public addPoint(point: Point2D): void {
    this.points.push(point);
  }

  public setRefId(id: string): void {
    this.refId = id;
  }

  public reverse() {
    this.points = this.points.reverse();
    this.cuttingDirection = 1000;
    this.close();
  }

  public get isComplex(): boolean {
    return this.points.length > 2;
  }

  public close(): void {
    this.startEndVectors.start = this.points[0];
    this.startEndVectors.end = this.points[this.points.length - 1];
    if(this.cuttingDirection === 1000){
      this.calculateDirection();
    }

  }

  private calculateDirection() {
    const { start, end } = this.startEndVectors;
    let dy = end.y - start.y;
    let dx = end.x - start.x;
    let theta = Math.atan2(dy, dx);
    theta *= 180 / Math.PI;
    if (theta < 0) {
      theta = 360 + theta;
    }
    this.cuttingDirection = theta;
    console.log(`## [GbrNode] calculateDirection | ${this.refId} -> ${theta}*`);
    console.log(`## [GbrNode] calculateDirection | done`);
  }

  public clone(cloneId: string): GbrNode {
    const clone = new GbrNode();
    clone.startEndVectors = JSON.parse(JSON.stringify(this.startEndVectors));
    clone.type = this.type;
    clone.refId = `${this.refId}-${cloneId}`;
    clone.points = JSON.parse(JSON.stringify(this.points));
    return clone;
  }
}
