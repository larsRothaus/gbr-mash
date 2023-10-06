//
//  GbrParser.ts
//
//  Created by Lars Rothaus on 03/10/2023.
//  Copyright © 03/10/2023 Lars Rothaus. All rights reserved.
//

import { GbrNode, GbrNodeType } from '../../dtos/GbrNode';
import { Point2D } from '../../dtos/Point2D';

const BGToolUp = 'M15*';
const BGToolDown = 'M14*';
const BGProgramStart = 'H1*';
const BGProgramEnd = 'M0';
export const filterCutNodes = (nodes: GbrNode[]): GbrNode[] => {
  return nodes.filter(value => value.type === GbrNodeType.ToolDown);
};
export const getVectorDist = (seed: Point2D, candidate: Point2D): number => {
  return Math.sqrt(Math.pow((candidate.x - seed.x), 2) + Math.pow((candidate.y - seed.y), 2));
};
export const optimizeToolPathUtil = (nodes: GbrNode[], keepIndex: boolean = false): GbrNode[] => {
  const optimizeNodeIds: string[] = [];
  const optimizevectors: GbrNode[] = [];
  if (!nodes.length) {
    return [];
  }

  const tdNodes: GbrNode[] = filterCutNodes(nodes);

  let seedNode: GbrNode = tdNodes[0];

  while (tdNodes.length != optimizevectors.length) {
    if (!seedNode.startEndVectors?.start || !seedNode.startEndVectors?.end) {
      throw new Error(`Error class:GbrParser[optimizeToolPath] : seedNode Missing startEndVectors!`);
    }
    const seedVector = seedNode.startEndVectors!.end;
    optimizevectors.push(seedNode);
    optimizeNodeIds.push(seedNode.refId);
    let currentBest: GbrNode | undefined = undefined;
    let bestDist: number = 9999999999999;
    if (tdNodes.length === optimizevectors.length) {
      // this continue should complete the while condition
      continue;
    }
    ///////////////////////////////////////
    for (let cn in tdNodes) {
      const node = tdNodes[cn];
      if (!node.startEndVectors?.start || !node.startEndVectors?.end) {
        throw new Error(`Error class:GbrParser[optimizeToolPath] : candidateNode Missing startEndVectors!`);
      }
      if (optimizeNodeIds.includes(node.refId)) {
        continue;
      }
      let dist = getVectorDist(seedVector, node.startEndVectors.start);
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
      console.log(`## | where are we_ `, tdNodes.length, optimizevectors.length);
      throw new Error(`Error class:GbrParser[optimizeToolPath] : No current best!`);
    }
  }
  if (tdNodes.length === optimizevectors.length) {
    console.log(`## [GbrParser] optimizeToolPath | KNN Path`);
    console.log(optimizevectors.map(value => value.refId));
    nodes = optimizevectors;
  }
  return nodes;
};

export class GbrParser {

  private nodes: GbrNode[] = [];
  private currentReadPosition: Point2D = { x: 0, y: 0 };
  private nodeIndex:number = 1;

  constructor() {

  }

  public async loadAndParse(url: string): Promise<void> {
    const res = await fetch(url);
    const gbrData = await res.text();
    if (gbrData) {
      this.parse(gbrData, {});
    }
  }

  public parse(gbrFile: string, option: {}): void {


    const code = gbrFile.split(/\r?\n/);
    let toolState = undefined;
    let currentNode: GbrNode = new GbrNode();
    currentNode.type = GbrNodeType.ToolUp;
    currentNode.addPoint(this.currentReadPosition);
    currentNode.setRefId(`N-${this.nodeIndex}`);


    const storeAndCreateNewNode = (type: GbrNodeType) => {
      if (currentNode && currentNode.points.length > 1) {
        currentNode.close();
        this.nodes.push(currentNode);
         this.nodeIndex++
      }
      currentNode = new GbrNode();
      currentNode.type = type;
      currentNode.addPoint(this.currentReadPosition);
      currentNode.setRefId(`N-${this.nodeIndex}`);

    };

    for (let i in code) {
      switch (true) {
        case (code[i] === BGProgramStart): {

          break;
        }
        case (code[i] === BGProgramEnd): {

          break;
        }
        case (code[i] === BGToolUp): {
          storeAndCreateNewNode(GbrNodeType.ToolUp);
          break;
        }
        case (code[i] === BGToolDown): {
          storeAndCreateNewNode(GbrNodeType.ToolDown);

          break;
        }
        case (code[i][0] === 'X'): {
          const cord = code[i].slice(1, code[i].length - 1).split('Y');

          let x = parseInt(cord[0]);
          let y = parseInt(cord[1]);


          console.log(`## [GbrParser] parse | x:${x} y:${y}`);

          this.currentReadPosition = {
            x,
            y
          };

          currentNode.addPoint({
            x,
            y
          });
          break;
        }
      }
    }
    this.complete(this.nodes);
  }

  public getGbrFile(): string {
    return this.nodes.join('\n');
  }

  public getNodes(): GbrNode[] {
    return this.nodes;
  }

  public complete(nodes: GbrNode[]): void {

  }

  public optimize():void {
    this.nodes = optimizeToolPathUtil(this.nodes);
  }
}
