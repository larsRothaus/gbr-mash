/** *************************** **/
/// Class: GbrView
// Lars Rothaus --> 03/10/2023
/** *************************** **/

import React from 'react';
import Konva from 'konva';
import { GbrNode, GbrNodeType } from '../../dtos/GbrNode';
import { Point2D } from '../../dtos/Point2D';
import { Utils } from './Utils';
import { GbrDataModel, GbrDataModelEvents } from '../../models/GbrDataModel';
import { Ruler } from './items/Ruler';
import { CloneInfo } from '../../../view-components/GbrCloneTool';
import { BaseViewItem } from './items/BaseViewItem';

type Props = {
  viewNodeLayers?: GbrViewNodeLayers
};

export interface GbrViewNodeLayers {
  ruler?: BaseViewItem;
  frameViewNode?: GbrDataModel;
  viewNodes?: GbrDataModel[];
}

type State = {};

class GbrView extends React.Component<Props, State> {
  private container!: HTMLDivElement;
  private stage!: Konva.Stage;

  private viewItemLayer!: Konva.Layer;
  private moveNodeLayer!: Konva.Layer;
  private labelsLayer!: Konva.Layer;
  private tabelLayer!: Konva.Layer;

  private dataInstanceId?: string;

  private scale: number = 0.088;
  private initPos: Point2D = {
    x: 80,
    y: 200
  };
  private ruler: Ruler = new Ruler();

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
    if (this.props.viewNodeLayers) {
      this.renderData(this.props.viewNodeLayers);
    }
  }

  componentDidMount() {
    this.stage = this.setupStage();
    this.setupControls();
    if (this.props.viewNodeLayers) {
      this.renderData(this.props.viewNodeLayers);
    }
  }

  private setupStage(): Konva.Stage {
    var width = window.innerWidth;
    var height = window.innerHeight;
    const stage = new Konva.Stage({
      container: 'container',
      width: width,
      height: height,
      draggable: true

    });
    stage.scale({ x: this.scale, y: this.scale });
    stage.setPosition({ x: 25, y: 60 });

    return stage;
  }

  private setupControls(): void {
    var scaleBy = 1.05;
    this.stage.on('wheel', (e) => {
      // stop default scrolling
      e.evt.preventDefault();

      var oldScale = this.stage.scaleX();
      var pointer = this.stage.getPointerPosition();
      if (!pointer) {
        return;
      }

      var mousePointTo = {
        x: (pointer.x - this.stage.x()) / oldScale,
        y: (pointer.y - this.stage.y()) / oldScale
      };

      let direction = e.evt.deltaY > 0 ? 1 : -1;

      if (e.evt.ctrlKey) {
        direction = -direction;
      }

      var newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;
      this.stage.scale({ x: newScale, y: newScale });

      var newPos = {
        x: pointer.x - mousePointTo.x * newScale,
        y: pointer.y - mousePointTo.y * newScale
      };
      this.stage.position(newPos);
    });

  }

  private renderData(layers?: GbrViewNodeLayers) {
    if (!layers) {
      console.log(`## [GbrView] renderData | No layers`);
      return;
    }
    this.stage.removeChildren();
    var width = window.innerWidth;
    var height = window.innerHeight;
    this.stage.setSize({
      width,
      height
    })

    if (layers.ruler) {
      this.stage.add(layers.ruler);
    }
    if (layers.viewNodes && layers.viewNodes.length) {
      for (let i in layers.viewNodes) {
        this.stage.add(layers.viewNodes[i].container);
      }
    }
    if (layers.frameViewNode) {
      this.stage.add(layers.frameViewNode.container);
    }
  }


  render() {
    return (
      <div ref={instance => this.container} id='container'>

      </div>
    );
  }
}

export default GbrView;
