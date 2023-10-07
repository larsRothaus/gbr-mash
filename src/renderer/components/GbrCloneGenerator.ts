//
//  GbrCloneGenerator.ts
//
//  Created by Lars Rothaus on 07/10/2023.
//  Copyright © 07/10/2023 Lars Rothaus. All rights reserved.
//

import { GbrDataModel } from '../models/GbrDataModel';
import { CloneInfo } from '../../view-components/GbrCloneTool';

export class GbrCloneGenerator {

  constructor() {

  }

  public generateCloneItems(masterNode: GbrDataModel, cloneInfo: CloneInfo):GbrDataModel[] {
    const cloneViews: GbrDataModel[] = [];
    const px = masterNode.frameSize.width + cloneInfo.px;
    const py = masterNode.frameSize.height + cloneInfo.py;
    console.log(`## [GbrView] renderData | clone info:`, cloneInfo);
    if (!cloneInfo.cy) cloneInfo.cy = 1;
    for (let y = 0; y < cloneInfo.cy; y++) {
      for (let x = 0; x < cloneInfo.cx; x++) {
        console.log(`## [GbrView] renderData | x:${x},y:${y}`, x !== 0 && y !== 0);
        if (x === 0 && y === 0) {
          cloneViews.push(masterNode);

        } else {
          console.log(`## [GbrView] renderData | adding clone..`);
          const clone = masterNode.clone(`${x}${y}`);
          clone.offset(x * px, y * py);
          cloneViews.push(clone);
        }
      }
    }
    return cloneViews;
  }
}
