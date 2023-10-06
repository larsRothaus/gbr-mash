//
//  Ruler.ts
//
//  Created by Lars Rothaus on 06/10/2023.
//  Copyright © 06/10/2023 Lars Rothaus. All rights reserved.
//

import Konva from 'konva';
import { BaseViewItem } from './BaseViewItem';

export class Ruler extends BaseViewItem {
  private initX = 0;
  private initY = 0;
  private visualOffset = 10;
  private offsetWidthY = 0;
  constructor() {
    super();


    this.createXRuler(12000,1000)
      this.createYRuler(24000,1000)

  }

  private createXRuler(lengthAsmm:number, markerInterval:number){
    const xLine = new Konva.Line({
      x: this.initX - this.visualOffset,
      y: this.initY,
      points: [0, 0,0,lengthAsmm],
      stroke: 'green',
      strokeWidth: 5,
      draggable: false,
      name: 'line',
      hitStrokeWidth: 50
    });

    this.add(xLine);
    const interval = markerInterval;
    const steps = Math.ceil(lengthAsmm / markerInterval);
    let currentStep = 0;
    while (currentStep <= steps) {
      this.add(new Konva.Line({
        x: this.initX - this.visualOffset,
        y: this.initY + currentStep * interval,
        points: [0, 0, -100, 0],
        stroke: 'green',
        strokeWidth: 5,
        draggable: false,
        name: 'line',
      }));
      this.add(new Konva.Text({
        x: this.initX - 240,
        y: this.initY + currentStep * interval - 30,
        rotation: 0,
        text: `${currentStep * interval / 10}`,//}
        fontSize: 50,
        fontFamily: 'Monaco',
        fill: 'green',
        align:'right'
      }))
      // lines.push(`X${0}Y${currentStep * interval}*`);
      // lines.push(`M14*`);
      // // lines.push(`X${currentStep * interval}Y${100}*`);
      // lines.push(`X${500}Y${currentStep * interval}*`);
      currentStep++;
    }
  }
  private createYRuler(lengthAsmm:number, markerInterval:number){
    const xLine = new Konva.Line({
      x: this.initX,
      y: this.initY - this.visualOffset,
      points: [0, 0,lengthAsmm,0],
      stroke: 'green',
      strokeWidth: 5,
      draggable: false,
      name: 'line',
      hitStrokeWidth: 50
    });

    this.add(xLine);
    const interval = markerInterval;
    const steps = Math.ceil(lengthAsmm / markerInterval);
    let currentStep = 0;
    while (currentStep <= steps) {
      this.add(new Konva.Line({
        x: this.initX +currentStep * interval,
        y: this.initY- this.visualOffset,
        points: [0, 0, 0, -100],
        stroke: 'green',
        strokeWidth: 5,
        draggable: false,
        name: 'line',
      }));
      this.add(new Konva.Text({
        x: this.initX + currentStep * interval-25,
        y: this.initY -140,
        rotation: -90,
        text: `${currentStep * interval / 10}`,//}
        fontSize: 50,
        fontFamily: 'Monaco',
        fill: 'green'
      }))
      currentStep++;
    }
  }


}
