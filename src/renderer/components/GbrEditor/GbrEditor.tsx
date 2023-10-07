/** *************************** **/
/// Class: GbrEditor
// Lars Rothaus --> 04/10/2023
/** *************************** **/


import React from 'react';
import GbrView, { GbrViewNodeLayers } from '../GbrView/GbrView';
import { GbrDataModel } from '../../models/GbrDataModel';
import GbrEditorToolBox from '../../../view-components/GbrEditorToolBox';
import GbrToolContainer from '../../../view-components/GbrToolContainer';
import GbrCloneTool, { CloneInfo } from '../../../view-components/GbrCloneTool';
import GbrViewTool from '../../../view-components/GbrViewTool';
import GbrFrameTool from '../../../view-components/GbrFrameTool';
import { GbrFrameGenerator } from '../GbrFrameGenerator';
import { Ruler } from '../GbrView/items/Ruler';
import { GbrCloneGenerator } from '../GbrCloneGenerator';
import GbrToolPathTool from '../../../view-components/GbrToolPathTool';
import { GbrNode } from '../../dtos/GbrNode';

type Props = {
  nodeData?: GbrDataModel
};


type State = {
  viewNodeLayers?: GbrViewNodeLayers
};

class GbrEditor extends React.Component<Props, State> {
  private dataInstanceId?: string;
  private gbrView: GbrView | null = null;
  private gbrFrameGenerator: GbrFrameGenerator = new GbrFrameGenerator();
  private gbrCloneGenerator: GbrCloneGenerator = new GbrCloneGenerator();
  private ruler: Ruler = new Ruler();

  private currentViewNodes?: GbrDataModel[];
  private toolPathViewNode?: GbrDataModel;


  componentDidMount() {
    this.setState({
      viewNodeLayers: {
        ruler: this.ruler,
        viewNodes: this.props.nodeData ? [this.props.nodeData] : []
      }
    });
  }

  private updateViewNodes(nodes: GbrDataModel[]): void {
    let viewNodeLayers = this.state.viewNodeLayers;
    if (viewNodeLayers && viewNodeLayers.viewNodes) {
      viewNodeLayers.viewNodes = nodes;
    }
    this.setState({
      viewNodeLayers
    });
  }


  private updateFrameNode(frameNode?: GbrDataModel): void {
    let viewNodeLayers = this.state.viewNodeLayers;
    if (viewNodeLayers) {
      viewNodeLayers.frameViewNode = frameNode;
    }
    this.setState({
      viewNodeLayers
    });
  }

  render() {
    return (
      <div className={'GbrEditorContainer'}>
        <div className={'GbrEditor'}>
          <GbrView ref={instance => this.gbrView = instance} viewNodeLayers={this.state?.viewNodeLayers} />
        </div>
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          height: 0
        }} className={'GbrEditorToolBox'}>
          <GbrToolContainer open={false} heading={'Tool'} nodeData={this.props.nodeData}>
            <GbrEditorToolBox nodeData={this.props.nodeData} />
          </GbrToolContainer>
        </div>
        <div style={{
          position: 'absolute',
          top: 0,
          right: 300,
          height: 0
        }} className={'GbrCloneTool'}>
          <GbrToolContainer open={false} heading={'Clone'} nodeData={this.props.nodeData}>
            <GbrCloneTool cloneItems={cloneInfo => {
              if (this.props.nodeData) {
                const viewItems = this.gbrCloneGenerator.generateCloneItems(this.props.nodeData, cloneInfo);
                this.updateViewNodes(viewItems);
              }
              //
            }} clear={() => {
              if (this.props.nodeData) {
                this.updateViewNodes([this.props.nodeData]);
              }

            }} />
          </GbrToolContainer>
        </div>
        <div style={{
          position: 'absolute',
          top: 0,
          right: 600,
          height: 0
        }} className={'GbrViewTool'}>
          <GbrToolContainer open={false} heading={'View'} nodeData={this.props.nodeData}>
            <GbrViewTool visibilityChange={(showLabels) => {
              if (this.state.viewNodeLayers && this.state.viewNodeLayers.viewNodes) {
                this.state.viewNodeLayers.viewNodes.forEach(value => value.setLabelVisibility(showLabels));
              }
            }
            } />
          </GbrToolContainer>
        </div>
        <div style={{
          position: 'absolute',
          top: 0,
          right: 900,
          height: 0
        }} className={'GbrFrameTool'}>
          <GbrToolContainer open={false} heading={'Frame'} nodeData={this.props.nodeData}>
            <GbrFrameTool generateFrames={(cellSizeX, cellSizeY, cellCountX, cellCountY) => {
              debugger;
              const frameData = this.gbrFrameGenerator.generateFrameViewNode({
                cellSizeX,
                cellSizeY,
                cellCountX,
                cellCountY
              });
              this.updateFrameNode(frameData);

            }} clearFrames={() => {
              this.updateFrameNode(undefined);
            }} />
          </GbrToolContainer>
        </div>
        <div style={{
          position: 'absolute',
          top: 0,
          right: 1200,
          height: 0
        }} className={'GbrToolContainer'}>
          <GbrToolContainer open={false} heading={'ToolPath'} nodeData={this.props.nodeData}>
            <GbrToolPathTool toolPathModeChanged={toolPathMode => {
              if (toolPathMode) {
                if (this.state.viewNodeLayers && this.state.viewNodeLayers.viewNodes) {
                  this.currentViewNodes = this.state.viewNodeLayers.viewNodes;
                  const gbrNodes: GbrNode[] = [];
                  for (let i in this.currentViewNodes) {
                    this.currentViewNodes[i].nodes.forEach(value => gbrNodes.push(value.node));
                  }
                  this.toolPathViewNode = new GbrDataModel(gbrNodes, {
                    width: 24000,
                    height: 12000
                  }, {
                    color: { r: 200, g: 200, b: 200 }
                  });

                  this.updateViewNodes([this.toolPathViewNode]);
                }
              } else {
                this.toolPathViewNode = undefined;
                if (this.currentViewNodes) {
                  this.updateViewNodes(this.currentViewNodes);
                  this.currentViewNodes = undefined;
                }


              }

            }} generateToolPath={() => {
              if (this.toolPathViewNode) {
                this.toolPathViewNode.removeMoveNodes();
                this.toolPathViewNode.generateToolPath();
              }
            }} />
          </GbrToolContainer>
        </div>
      </div>
    );
  }
}

export default GbrEditor;
