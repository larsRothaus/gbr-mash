//
//  GbrGenerator.ts
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

export class GbrGenerator {

  constructor() {

  }
}

export interface GBRCodeGeneratorOptions {
  insertToolUpAfterEveryMove: boolean

}

export class GBRCodeGenerator {
  public static generateCodeFromNotes(nodes: GbrNode[], options: Partial<GBRCodeGeneratorOptions> = {}): string {
    
    const lines: string[] = [
      'H1*',
      'G71*',
      'N1*'
    ];

    let toolState: GbrNodeType | undefined = undefined;
    let lastCommand:string |undefined = undefined;
    let linesAdded = 0;
    for (let i in nodes) {
      if (toolState !== nodes[i].type) {
        if(lastCommand && linesAdded === 0){
          lines.push(lastCommand)
        }
        linesAdded = 0;
        switch (nodes[i].type) {
          case GbrNodeType.ToolUp: {
            if (lines[lines.length - 1] !== BGToolUp) {
              lines.push(BGToolUp);
            }

            break;
          }
          case GbrNodeType.ToolDown: {
            if (lines[lines.length - 1] !== BGToolDown) {
              lines.push(BGToolDown);
            }
            break;
          }
        }
      }

      let points = nodes[i].points;
      let lastPoint: Point2D | undefined = undefined;
      for (let v = 0; v < points.length; v++) {

        const command = `X${points[v].x}Y${points[v].y}*`;
        if (command !== lastCommand) {
          lastCommand = command;
          lines.push(command);
          linesAdded++;
        }
        lastPoint = points[v];
      }

    }
    lines.push('M15*')
    lines.push('M0*');
    return lines.join('\n');
  }
}
