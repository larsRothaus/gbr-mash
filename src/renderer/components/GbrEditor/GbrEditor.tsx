/** *************************** **/
/// Class: GbrEditor
// Lars Rothaus --> 04/10/2023
/** *************************** **/


import React from 'react';
import GbrView from '../GbrView/GbrView';
import { GbrDataModel } from '../../models/GbrDataModel';
import GbrEditorToolBox from '../../../view-components/GbrEditorToolBox';

type Props = {
  nodeData?: GbrDataModel
};


type State = {};

class GbrEditor extends React.Component<Props, State> {
  private dataInstanceId?: string;


  componentDidMount() {

  }

  render() {
    return (
      <div className={'GbrEditorContainer'}>
        <div className={'GbrEditor'}>
          <GbrView nodeData={this.props.nodeData}></GbrView>
        </div>
        <div className={'GbrEditorToolBox'}>
          <GbrEditorToolBox nodeData={this.props.nodeData}></GbrEditorToolBox>
        </div>
      </div>
    );
  }
}

export default GbrEditor;
