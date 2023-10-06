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

type Props = {
  nodeData?: GbrDataModel

};


type State = {
  cloneInfo?:CloneInfo
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
          <GbrEditorToolBox nodeData={this.props.nodeData}></GbrEditorToolBox>
        </div>
        <div className={'GbrCloneToolBox'}>
          <GbrToolContainer heading={"Clone"} nodeData={this.props.nodeData}>
            <GbrCloneTool cloneItems={cloneInfo => {
              if(cloneInfo){
                this.setState({
                  cloneInfo
                })
              }
            }} clear={()=>{
              this.setState({
                cloneInfo:undefined
              })
            }}></GbrCloneTool>
          </GbrToolContainer>
        </div>
      </div>
    );
  }
}

export default GbrEditor;
