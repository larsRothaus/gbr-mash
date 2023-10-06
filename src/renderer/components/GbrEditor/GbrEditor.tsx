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

type Props = {
  nodeData?: GbrDataModel

};


type State = {
  cloneInfo?: CloneInfo
};

class GbrEditor extends React.Component<Props, State> {
  private dataInstanceId?: string;

  componentDidMount() {

  }

  render() {
    return (
      <div className={'GbrEditorContainer'}>
        <div className={'GbrEditor'}>
          <GbrView nodeData={this.props.nodeData} cloneInfo={this.state?.cloneInfo}></GbrView>
        </div>
        <div className={'GbrEditorToolBox'}>
          <GbrToolContainer heading={'Tool'} nodeData={this.props.nodeData}>
            <GbrEditorToolBox nodeData={this.props.nodeData}></GbrEditorToolBox>
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
            }}></GbrCloneTool>
          </GbrToolContainer>
        </div>
        <div className={'GbrCloneToolBox'}>
          <GbrToolContainer heading={'Clone'} nodeData={this.props.nodeData}>
            <GbrViewTool visibilityChange={(showLabels) => {
              if(this.props.nodeData){
                this.props.nodeData.setLabelVisibility(showLabels);
              }
            }
            }></GbrViewTool>
          </GbrToolContainer>
        </div>
      </div>
    );
  }
}

export default GbrEditor;
