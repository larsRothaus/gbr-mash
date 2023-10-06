//
//  GbrViewNode.ts
//
//  Created by Lars Rothaus on 04/10/2023.
//  Copyright © 04/10/2023 Lars Rothaus. All rights reserved.
//

import { GbrNode, GbrNodeType } from './GbrNode';
import { RGBValues, Utils } from '../components/GbrView/Utils';
import Konva from 'konva';
import { Point2D } from './Point2D';

export class GbrViewNode {
  public color: string = Utils.GenerateRandomColor();

  public id: number;
  public node: GbrNode;
  public type:GbrNodeType;

  public viewItem: Konva.Line;

  public startLabel?: Konva.Text;
  public endLabel?: Konva.Text;

  private rgbColor: RGBValues = Utils.GenerateRandomRGB();
  private strokeNutral: string;
  private StrokeHower: string;

  private vectorConfig: Konva.LineConfig;
  private selectedState: boolean = false;
  constructor(id: number, node: GbrNode, reuse?:Konva.LineConfig) {
    this.id = id;
    this.node = node;
    this.type = this.node.type;


    if (this.node.type === 'ToolUp') {
      this.rgbColor = {r:255,g:0,b:0}
    }

    this.strokeNutral = Utils.GenerateColorFromRGB(this.rgbColor, .7);
    this.StrokeHower = Utils.GenerateColorFromRGB(this.rgbColor, 1);
    this.vectorConfig = reuse ?? {
      x: 0,
      y: 0,
      points: [],
      stroke: this.strokeNutral,
      strokeWidth:10,
      draggable: false,
      name: 'line',
      hitStrokeWidth: 50
    };

    this.viewItem = this.buildViewItem();

    this.setupLabels();
    this.setupInteraction();

  }

  private buildViewItem():Konva.Line{

    let currentVectors: Point2D[] = this.node.points;

    if(this.type === GbrNodeType.ToolUp){
      if(currentVectors.length === 2 && currentVectors[0].x ===  currentVectors[1].x && currentVectors[0].y===  currentVectors[1].y) {
        //@ts-ignore
        this.viewItem = new Konva.Circle({
          x: currentVectors[0].x,
          y: currentVectors[0].y,
          radius:10,
          fill:'red'
        });

        //@ts-ignore
        return this.viewItem;
      }
    }

    for (let v in currentVectors) {
      const { x, y } = currentVectors[v];
      //@ts-ignore
      this.vectorConfig.points.push(x);
      //@ts-ignore
      this.vectorConfig.points.push(y);
    }


    this.viewItem = new Konva.Line(this.vectorConfig);
    return this.viewItem;
  }

  private setupLabels() {
    let rotation = 0;
    let xAjust = 0;
    let yAjust = 0;
    if (this.viewItem.getWidth() + this.viewItem.getHeight() !== 0) {
      // if (line.getWidth() > line.getHeight()) {
      //   yAjust = -25
      //   xAjust = 0
      // }
      // else {
      //   rotation = -90
      //   yAjust = 65
      //   xAjust = -25
      // }
      if (this.node.type !== GbrNodeType.ToolUp) {

        const displacementFactor = (this.id % 2 === 0) ? 20 : -20;

        this.startLabel = new Konva.Text({
          x: this.node.startEndVectors.start.x + xAjust + displacementFactor,
          y: this.node.startEndVectors.start.y + yAjust + displacementFactor,
          rotation,
          text: `id:${this.node.refId} start - x:${this.node.startEndVectors.start.x} y:${this.node.startEndVectors.start.y}`,//}
          fontSize: 18,
          fontFamily: 'Monaco',
          fill: this.strokeNutral
        });
        this.endLabel = new Konva.Text({
          x: this.node.startEndVectors.end.x + xAjust,
          y: this.node.startEndVectors.end.y + yAjust,
          rotation,
          text: `id:${this.node.refId} end - x:${this.node.startEndVectors.end.x} y:${this.node.startEndVectors.end.y}`,//
          fontSize: 18,
          fontFamily: 'Monaco',
          fill: this.strokeNutral
        });
      }
    }
  }

  private setupInteraction() {
    this.viewItem.on('click', (e) => {
      if (!this.selectedState) {
        this.selected = true;
      } else {
        this.selected = false;
      }

      let lastEntry:Point2D = this.node.points[0];
      for(let i=1;i<this.node.points.length;i++){
        console.log(`## [GbrViewNode] index:${i} diffX: ${Math.abs(lastEntry.x - this.node.points[i].x)} diffY: ${Math.abs(lastEntry.y - this.node.points[i].y)}`);
        console.log(`## [GbrViewNode] index:${i} X${this.node.points[i].x}Y${this.node.points[i].y}`);
        lastEntry = this.node.points[i];
      }
    });
    // add cursor styling
    this.viewItem.on('mouseover', (e) => {

      document.body.style.cursor = 'pointer';
      // //@ts-ignore
      // if (!this.selectedState) {
      //   //@ts-ignore
      //   this.viewItem.setStroke(this.strokeNutral);
      // }

    });
    this.viewItem.on('mouseout', () => {
      document.body.style.cursor = 'default';
      // if (!this.selectedState) {
      //   //@ts-ignore
      //   this.viewItem.setStroke(this.strokeNutral);
      // }
    });
  }



  public get selected():boolean{
    return this.selectedState;
  }

  public set selected(value:boolean){
    this.selectedState = value;
    if (this.selectedState) {
      this.selectedState = true;
      //@ts-ignore
      this.viewItem.setStroke('green');
    } else {
      this.selectedState = false;
      //@ts-ignore
      this.viewItem.setStroke(this.strokeNutral);
    }
  }
  public set visible(value:boolean){
    this.viewItem.visible(value);
  }
}
