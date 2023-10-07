//
//  GbrFrameGenerator.ts
//
//  Created by Lars Rothaus on 07/10/2023.
//  Copyright © 07/10/2023 Lars Rothaus. All rights reserved.
//

import { GbrNode, GbrNodeType } from '../dtos/GbrNode';
import { GbrDataModel } from '../models/GbrDataModel';

export interface GenerateFrameNodesArgs {
  cellCountX: number,
  cellCountY: number,
  cellSizeX: number,
  cellSizeY: number
}

export class GbrFrameGenerator {

  constructor() {

  }

  /** Vertical is Y **/
  private generateHorizontal(args: GenerateFrameNodesArgs, pastLastNode?:GbrNode): GbrNode[] {
    const { cellCountX, cellCountY, cellSizeX, cellSizeY } = args;
    const lines: GbrNode[] = [];

    const zeroNode: GbrNode = new GbrNode();
    zeroNode.type = GbrNodeType.ToolUp;
    zeroNode.addPoint({ x: 0, y: 0 });
    zeroNode.addPoint({ x: 0, y: 0 });
    zeroNode.close();

    let lastNode: GbrNode | undefined = pastLastNode ?? zeroNode;

    for (let i = 0; i < cellCountY + 1; i++) {
      const node = new GbrNode();
      node.addPoint({
        x: 0,
        y: i * cellSizeY
      });
      node.addPoint({
        x: cellCountX * cellSizeX,
        y: i * cellSizeY
      });
      node.type = GbrNodeType.ToolDown;
      node.close();

      if (lastNode) {
        const moveNode = new GbrNode();
        moveNode.type = GbrNodeType.ToolUp;
        moveNode.addPoint(lastNode.startEndVectors.end);
        moveNode.addPoint(node.startEndVectors.start);
        moveNode.close();
        lines.push(moveNode);
      }
      lines.push(node);
      lastNode = node;

    }
    return lines;
  }

  /** Vertical is X **/
  private generateVertical(args: GenerateFrameNodesArgs, pastLastNode?:GbrNode): GbrNode[] {
    const { cellCountX, cellCountY, cellSizeX, cellSizeY } = args;
    const lines: GbrNode[] = [];

    const zeroNode: GbrNode = new GbrNode();
    zeroNode.type = GbrNodeType.ToolUp;
    zeroNode.addPoint({ x: 0, y: 0 });
    zeroNode.addPoint({ x: 0, y: 0 });
    zeroNode.close();

    let lastNode: GbrNode | undefined = pastLastNode ?? zeroNode;

    for (let i = 0; i < cellCountX + 1; i++) {
      const node = new GbrNode();
      node.addPoint({
        x: i * cellSizeX,
        y: 0
      });
      node.addPoint({
        x: i * cellSizeX,
        y: cellCountY * cellSizeY
      });
      node.type = GbrNodeType.ToolDown;
      node.close();

      if (lastNode) {
        const moveNode = new GbrNode();
        moveNode.type = GbrNodeType.ToolUp;
        moveNode.addPoint(lastNode.startEndVectors.end);
        moveNode.addPoint(node.startEndVectors.start);
        moveNode.close();
        lines.push(moveNode);
      }
      lines.push(node);
      lastNode = node;
      /**
       * Here we could generate the move node as well
       */
    }
    return lines;
  }


  public generateFrameNodes(args: GenerateFrameNodesArgs): GbrNode[] {
    const horizontal: GbrNode[] = this.generateHorizontal(args);
    const vertical: GbrNode[] = this.generateVertical(args, horizontal[horizontal.length-1]);
    return [...horizontal, ...vertical];
  }

  public generateFrameViewNode(args: GenerateFrameNodesArgs): GbrDataModel {
    const gbrNodes: GbrNode[] = this.generateFrameNodes(args);
    const dataModel = new GbrDataModel(gbrNodes, {
      width: args.cellCountX * args.cellSizeX,
      height: args.cellCountY * args.cellSizeY
    });
    return dataModel;
  }
}
