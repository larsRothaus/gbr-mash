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
  viewNodeLayers?:GbrViewNodeLayers
};
export interface GbrViewNodeLayers {
  ruler?:BaseViewItem
  frameViewNode?:GbrDataModel
  viewNodes?:GbrDataModel[]
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
    if(this.props.viewNodeLayers){
      this.renderData(this.props.viewNodeLayers);
    }
  }

  componentDidMount() {
    this.stage = this.setupStage();

    if(this.props.viewNodeLayers){
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
    stage.setPosition({ x: 25, y: 60});

    return stage;
  }

  private renderData(layers?: GbrViewNodeLayers) {
    if(!layers){
      console.log(`## [GbrView] renderData | No layers`);
      return;
    }
    this.stage.removeChildren();

    if(layers.ruler){
      this.stage.add(layers.ruler);
    }
    if(layers.viewNodes && layers.viewNodes.length){
      for(let i in layers.viewNodes){
        this.stage.add(layers.viewNodes[i].container);
      }
    }
    if(layers.frameViewNode){
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
