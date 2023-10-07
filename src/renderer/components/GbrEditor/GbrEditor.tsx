/** *************************** **/
/// Class: GbrEditor
// Lars Rothaus --> 04/10/2023
/** *************************** **/


import React from 'react';
import GbrView from '../GbrView/GbrView';
import { GbrDataModel } from '../../models/GbrDataModel';
import GbrEditorToolBox from '../../../view-components/GbrEditorToolBox';
import GbrToolContainer from '../../../view-components/GbrToolContainer';
import GbrCloneTool, { CloneInfo } from '../../../view-components/GbrCloneTool';
import GbrViewTool from '../../../view-components/GbrViewTool';
import GbrFrameTool from '../../../view-components/GbrFrameTool';
import { GbrFrameGenerator } from '../GbrFrameGenerator';

type Props = {
  nodeData?: GbrDataModel
  viewNodes?:GbrDataModel[]
};


type State = {
  cloneInfo?: CloneInfo
  frameData?: GbrDataModel
};

class GbrEditor extends React.Component<Props, State> {
  private dataInstanceId?: string;
  private gbrView: GbrView | null = null;
  private gbrFrameGenerator: GbrFrameGenerator = new GbrFrameGenerator();

  componentDidMount() {
    // if(this.gbrView){
    //   this.gbrView.
    // }
  }

  render() {
    return (
      <div className={'GbrEditorContainer'}>
        <div className={'GbrEditor'}>
          <GbrView ref={instance => this.gbrView = instance} nodeData={this.props.nodeData}
                   cloneInfo={this.state?.cloneInfo} frameData={this.state?.frameData}/>
        </div>
        <div className={'GbrEditorToolBox'}>
          <GbrToolContainer heading={'Tool'} nodeData={this.props.nodeData}>
            <GbrEditorToolBox nodeData={this.props.nodeData} />
          </GbrToolContainer>
        </div>
        <div className={'GbrCloneToolBox'}>
          <GbrToolContainer heading={'Clone'} nodeData={this.props.nodeData}>
            <GbrCloneTool cloneItems={cloneInfo => {
              if (cloneInfo) {
                this.setState({
                  cloneInfo
                });
              }
            }} clear={() => {
              this.setState({
                cloneInfo: undefined
              });
            }} />
          </GbrToolContainer>
        </div>
        <div className={'GbrCloneToolBox'}>
          <GbrToolContainer heading={'Clone'} nodeData={this.props.nodeData}>
            <GbrViewTool visibilityChange={(showLabels) => {
              if (this.props.nodeData) {
                this.props.nodeData.setLabelVisibility(showLabels);
              }
            }
            } />
          </GbrToolContainer>
        </div>
        <div className={'GbrCloneToolBox'}>
          <GbrToolContainer heading={'frame'} nodeData={this.props.nodeData}>
            <GbrFrameTool generateFrames={(cellSizeX, cellSizeY, cellCountX, cellCountY) => {
              debugger;
              const frameData = this.gbrFrameGenerator.generateFrameViewNode({
                cellSizeX,
                cellSizeY,
                cellCountX,
                cellCountY
              });
              this.setState({
                frameData
              });
            }} clearFrames={() => {
              this.setState({
                frameData: undefined
              });
            }} />
          </GbrToolContainer>
        </div>
      </div>
    );
  }
}

export default GbrEditor;
