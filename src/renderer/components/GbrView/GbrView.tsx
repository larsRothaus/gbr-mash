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

type Props = {
  nodeData?: GbrDataModel
};

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

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
    if (this.props.nodeData && this.props.nodeData.instanceId !== this.dataInstanceId) {
      this.dataInstanceId = this.props.nodeData.instanceId;
      this.props.nodeData.addListener(GbrDataModelEvents.Updated, () => {
        if (this.props.nodeData) {
          this.renderData(this.props.nodeData);
        }
      });
      this.renderData(this.props.nodeData);
    }

  }

  componentDidMount() {

    //@ts-ignore
    window.render = ()=>{
      if (this.props.nodeData) {
        this.renderData(this.props.nodeData);
      }
    }
    this.stage = this.setupStage();
    this.setupLayers();
    this.setupTable();
    this.setupControls();

    if (this.props.nodeData) {
      this.renderData(this.props.nodeData);
      this.props.nodeData.addListener(GbrDataModelEvents.Updated, () => {
        if (this.props.nodeData) {
          this.renderData(this.props.nodeData);
        }
      });
    }

  }

  private setupStage(): Konva.Stage {
    var width = window.innerWidth;
    var height = window.innerHeight;
    const stage = new Konva.Stage({
      container: 'container',
      width: width,
      height: height,
      draggable: false

    });
    stage.scale({ x: this.scale, y: this.scale });

    return stage;
  }

  private setupLayers(): void {
    this.viewItemLayer = new Konva.Layer();
    this.moveNodeLayer = new Konva.Layer();
    this.labelsLayer = new Konva.Layer();
    this.tabelLayer = new Konva.Layer();

    this.stage.add(this.tabelLayer);
    this.stage.add(this.labelsLayer);
    this.stage.add(this.viewItemLayer);
    this.stage.add(this.moveNodeLayer);
  }

  private setupTable(): void {
    const backboardOffset = -500;
    const backBoard = new Konva.Rect({
      x: backboardOffset,
      y: backboardOffset,
      width: 27000 + Math.abs(backboardOffset),
      height: 22500 + Math.abs(backboardOffset),
      fill: '#616969'
    });

    const table = new Konva.Rect({
      x: -10,
      y: -10,
      width: 27000,
      height: 22500,
      fill: '#000000'
    });
    this.tabelLayer.add(backBoard);
    this.tabelLayer.add(table);
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

      // how to scale? Zoom in? Or zoom out?
      let direction = e.evt.deltaY > 0 ? 1 : -1;

      // when we zoom on trackpad, e.evt.ctrlKey is true
      // in that case lets revert direction
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

    document.addEventListener('keydown', (e) => {
      // if (e.code === 'Enter') {
      //   resolve();
      // }
      if (e.code === 'Space') {
        this.stage.setDraggable(true);
        return;
      }
      // if(!isRunning){
      //   console.log(`## [main-fabric] key:`,e.key);
      //   if(e.key === '$'){
      //     simunitionSpeed = 'awaitKey'
      //     resolve();
      //     return;
      //   }
      //   let s = parseInt(e.key);
      //   if(!isNaN(s)){
      //     simunitionSpeed = s * 100
      //     resolve();
      //   }
      // }

    });
    document.addEventListener('keyup', (e) => {
      if (e.code === 'Space') {
        this.stage.setDraggable(false);
      }
    });
  }

  private clear() {
    this.viewItemLayer.remove();
    this.moveNodeLayer.remove();
    this.labelsLayer.remove();

    this.viewItemLayer = new Konva.Layer();
    this.moveNodeLayer = new Konva.Layer();
    this.labelsLayer = new Konva.Layer();

    this.stage.add(this.labelsLayer);
    this.stage.add(this.viewItemLayer);
    this.stage.add(this.moveNodeLayer);
  }

  private renderData(data: GbrDataModel) {
    this.clear();
    const viewNodes = data.getViewNodes();

    console.log(`## [GbrView] renderData |`, viewNodes);
    for (let i in viewNodes) {
      console.log(`## [GbrView] renderData | adding notes`);
      const { viewItem, startLabel, endLabel, type } = viewNodes[i];
      switch (type) {
        case GbrNodeType.ToolUp: {
          this.moveNodeLayer.add(viewItem);
          break;
        }
        case GbrNodeType.ToolDown: {
          this.viewItemLayer.add(viewItem);
          break;
        }

      }
      if (startLabel && endLabel) {
        this.labelsLayer.add(startLabel);
        this.labelsLayer.add(endLabel);
      }
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
