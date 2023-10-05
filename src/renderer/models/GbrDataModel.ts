//
//  GbrDataModel.ts
//
//  Created by Lars Rothaus on 04/10/2023.
//  Copyright © 04/10/2023 Lars Rothaus. All rights reserved.
//

import { GbrNode, GbrNodeType } from '../dtos/GbrNode';
import { GbrViewNode } from '../dtos/GbrViewNode';
import { Utils } from '../components/GbrView/Utils';
import { EventEmitter } from 'events';
import { Point2D } from '../dtos/Point2D';
import { GBRCodeGenerator } from '../components/GbrGenerator/GbrGenerator';


export const getVectorDist = (seed: Point2D, candidate: Point2D): number => {
  return Math.sqrt(Math.pow((candidate.x - seed.x), 2) + Math.pow((candidate.y - seed.y), 2));
};

export const optimizeToolPathUtil = (nodes: GbrViewNode[], keepIndex: boolean = false): GbrViewNode[] => {
  const optimizeNodeIds: number[] = [];
  const optimizevectors: GbrViewNode[] = [];
  if (!nodes.length) {
    return [];
  }
  let seedNode: GbrViewNode = nodes[0];

  while (nodes.length != optimizevectors.length) {
    if (!seedNode.node.startEndVectors?.start || !seedNode.node.startEndVectors?.end) {
      throw new Error(`Error class:GbrParser[optimizeToolPath] : seedNode Missing startEndVectors!`);
    }
    const seedVector = seedNode.node.startEndVectors!.end;
    optimizevectors.push(seedNode);
    optimizeNodeIds.push(seedNode.id);
    let currentBest: GbrViewNode | undefined = undefined;
    let bestDist: number = 9999999999999;
    if (nodes.length === optimizevectors.length) {
      // this continue should complete the while condition
      continue;
    }
    ///////////////////////////////////////
    for (let cn in nodes) {
      const node = nodes[cn];
      if (!node.node.startEndVectors?.start || !node.node.startEndVectors?.end) {
        throw new Error(`Error class:GbrParser[optimizeToolPath] : candidateNode Missing startEndVectors!`);
      }
      if (optimizeNodeIds.includes(node.id)) {
        continue;
      }
      let dist = getVectorDist(seedVector, node.node.startEndVectors.start);
      if (dist < bestDist) {
        bestDist = dist;
        currentBest = node;
      }
      if (bestDist === 0) {
        break;
      }
    }
    ///////////////////////////////////////
    if (currentBest) {
      seedNode = currentBest;
    } else {
      console.log(`## | where are we_ `,nodes.length, optimizevectors.length);
      throw new Error(`Error class:GbrParser[optimizeToolPath] : No current best!`);
    }
  }
  if (nodes.length === optimizevectors.length) {
    console.log(`## [GbrParser] optimizeToolPath | KNN Path`);
    nodes = optimizevectors;
  }
  return nodes;
};
const GenerateMoveNode = (start: Point2D, end: Point2D): GbrViewNode => {
  const moveNode = new GbrNode();
  moveNode.type = GbrNodeType.ToolUp;
  moveNode.points = [start, end];

  return new GbrViewNode(0,moveNode);
}
export const  adjustTUNodes = (nodes:GbrViewNode[], keepIndex:boolean=false): GbrViewNode[] =>{
  const tdNodes: GbrViewNode[] = nodes;
  const addLiftBetweenSections: boolean = true;

  let adjustedNodes: GbrViewNode[] = [];
  if (nodes[0].type === GbrNodeType.ToolUp) {
    console.log(`## [GbrParser] adjustTUNodes | using first node as init`);
    adjustedNodes.push(nodes[0]);
  } else {
    console.log(`## [GbrParser] adjustTUNodes | GenerateMoveNode for init`);
    adjustedNodes.push(GenerateMoveNode({x: 0, y: 0}, tdNodes[0].node.startEndVectors.start))
  }
  //adding initNode
  //
  for (let i = 0; i < tdNodes.length; i++) {
    const from = tdNodes[i]
    const to = tdNodes[i + 1];

    adjustedNodes.push(from);

    if(!to || !from){
      continue
    }
    if (getVectorDist(from.node.startEndVectors.end, to.node.startEndVectors.start) !== 0) {
      console.log(`## [GbrParser] adjustTUNodes | Adding a move node`);
      adjustedNodes.push(GenerateMoveNode(from.node.startEndVectors.end, to.node.startEndVectors.start));
    }
    if(addLiftBetweenSections && to.node.type === GbrNodeType.ToolDown && from.node.type === GbrNodeType.ToolDown){
      GenerateMoveNode(from.node.startEndVectors.end, to.node.startEndVectors.start);
    }

    // console.log(`## [GbrDataModel] adjustTUNodes |\n`,GBRCodeGenerator.generateCodeFromNotes(adjustedNodes.map(nodes => nodes.node)));
  }

  return adjustedNodes;
}
export enum GbrDataModelEvents {
  Updated = 'GbrDataModelEvents.Updated'
}

interface OptPoint2D extends Point2D {
  id:number
}

export class GbrDataModel extends EventEmitter {
  public instanceId: string = Utils.GenerateId();
  public nodes: GbrViewNode[] = [];

  constructor(nodes: GbrNode[]) {
    super();
    this.nodes = nodes.map((value, index) => new GbrViewNode(index, value));
  }

  public testUpdate() {
    this.emit(GbrDataModelEvents.Updated);
  }

  public getViewNodes(): GbrViewNode[] {
    return this.nodes;
  }

  public getSelected(): GbrViewNode[] {
    return this.nodes.filter(value => value.selected);
  }

  public removeMoveNodes() {
    // for(let i in this.nodes){
    //   console.log(this.nodes[i].type);
    //   if(this.nodes[i].type === GbrNodeType.ToolUp){
    //     this.nodes[i].visible = false;
    //   }
    // }

    let moveNodes = this.nodes.filter(value => value.type === GbrNodeType.ToolUp);
    this.removeNodes(moveNodes.map(value => value.id), true);
  }

  public removeNodes(ids: number[], rerender: boolean = false) {
    // for (let i in ids) {
    //   console.log(`## [GbrDataModel] removeNodes | removing node with id:${ids[i]}`);
    //   this.nodes.splice(ids[i], 1);
    // }
    console.log(`## [GbrDataModel] removeNodes | before delete -> ${this.nodes.length}`);
    const filteredArray = this.nodes.filter(value => !ids.includes(value.id));
    this.nodes = filteredArray;
    console.log(`## [GbrDataModel] removeNodes | after delete -> ${this.nodes.length}`);
    if (rerender) {
      this.emit(GbrDataModelEvents.Updated);
    }
  }

  public reverseSelectedNode(){
    let selected = this.getSelected();
    if(selected.length === 0){
      console.log(`## [GbrDataModel] reverseSelectedNode | No selectedItems`);
      return
    }
    if(selected.length > 1){
      console.log(`## [GbrDataModel] reverseSelectedNode | only select one item`);
      return
    }
    if(selected[0]) {
      let id = selected[0].id;
      let nNode = new GbrNode();
      nNode.type = selected[0].node.type;
      nNode.refId = selected[0].node.refId;
      nNode.points = selected[0].node.points.reverse();
      nNode.close();

      this.removeNodes([id]);

      let nViewNode = new GbrViewNode(id, nNode);
      this.nodes.push(nViewNode);

      this.emit(GbrDataModelEvents.Updated);
    }
    this.deselectAll();
  }

  public joinSelected() {
    let selected = this.getSelected();
    let tbd = selected.map(value => value.id);

    if (selected.length === 0) {
      console.log(`## [GbrDataModel] joinSelected | Nothing was selected`);
      return;
    }

    let id = selected[0].id;
    let type = selected[0].node.type;
    let refId = selected[0].node.refId;
    let nPath: Point2D[] = [];
    for (let i in selected) {
      if (selected[i].node.type === type) {
        nPath = [...nPath, ...selected[i].node.points];
      }
    }

    nPath.sort((a, b) => a.y - b.y || a.x - b.x);

    console.log(`## [GbrDataModel] joinSelected |`, JSON.stringify(nPath, null, 2));
    let nNode = new GbrNode();
    nNode.type = type;
    nNode.refId = selected[0].node.refId;
    nNode.points = nPath;
    nNode.close();

    this.removeNodes(tbd);

    let nViewNode = new GbrViewNode(id, nNode);

    this.nodes.push(nViewNode);

    this.emit(GbrDataModelEvents.Updated);

    this.deselectAll();
  }

  public deselectAll() {
    this.nodes.forEach(value => {
      value.selected = false;
    });
  }

  public generateToolPath():void {
    let tbo = [];
    let rest = [];
    for(let i in this.nodes){
      let value = this.nodes[i]
      if(value.type === GbrNodeType.ToolDown && value.selected === false) {
        tbo.push(value)
      }else{
        rest.push(value);
      }
    }
    let optimized = optimizeToolPathUtil(tbo);
    this.nodes = adjustTUNodes([...rest, ...optimized]);
    this.emit(GbrDataModelEvents.Updated);
  }

  public saveWorkFile():void{
    const gbrNodes = this.nodes.map(value => value.node);
    const gbrCode = GBRCodeGenerator.generateCodeFromNotes(gbrNodes);
    Utils.download(gbrCode, "generated_gerber.gbr", "text/plain")
  }

}
