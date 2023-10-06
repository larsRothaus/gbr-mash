import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import React, { useEffect, useRef, useState } from 'react';
import { EventTypes } from '../Constants';
import { PlasmicCanvasHost } from '@plasmicapp/loader-react';
import { SvgRenderView } from './components/SvgTool/SvgRenderView';
import { GbrNode } from './dtos/GbrNode';
import GbrView from './components/GbrView/GbrView';
import { GbrParser } from './components/GbrParser/GbrParser';
import { GBRCodeGenerator, GbrGenerator } from './components/GbrGenerator/GbrGenerator';
import { Utils } from './components/GbrView/Utils';

import GbrEditor from './components/GbrEditor/GbrEditor';
import { GbrDataModel } from './models/GbrDataModel';

let loading = false;

type Props = {};

type State = {
  nodes?: GbrNode[],
  nodeData?: GbrDataModel
};

class MainView extends React.Component<Props, State> {

  private gbrParser = new GbrParser();
  private fileInput!:HTMLButtonElement | null

  componentDidMount() {

    setTimeout(() => this.render(), 5000);
    this.gbrParser.complete = (nodes: GbrNode[]) => {
      loading = false;
      if (nodes.length > 0) {
        // const gbrCode = GBRCodeGenerator.generateCodeFromNotes(nodes);
        const dataModel = new GbrDataModel(nodes, {width:6000,height: 12000});
        this.setState({ nodes, nodeData: dataModel });
      }
    };
    // this.gbrParser.loadAndParse('http://127.0.0.1:8080/test_v2_2X4(60X60).gbr');
    // this.gbrParser.loadAndParse('http://127.0.0.1:8080/WAVE_60X60_UPD2022.cut');
    //  this.gbrParser.loadAndParse('http://127.0.0.1:8080/generated_gerber.gbr');
    this.gbrParser.loadAndParse('http://127.0.0.1:8080/Wave60x60_X2_Design.gbr');
    // this.gbrParser.loadAndParse('http://localhost:8080/v1_tool_generated_file.gbr');

  }


  private viewSelector() {
    if (loading) {
      return (<div></div>);
    }
    if (this.state?.nodeData) {
      return (
        <GbrEditor nodeData={this.state?.nodeData}></GbrEditor>
      );
    } else {
      return (
        <SvgRenderView completeHandler={(nodes: GbrDataModel) => {
          // const gbrCode = GBRCodeGenerator.generateCodeFromNotes(nodes);
          // Utils.download(gbrCode, 'first_go.gbr', 'text/plain');
          this.setState({
            nodeData:nodes
          });
        }}></SvgRenderView>
      );
    }

  }

  render() {
    console.log(`## [App] render | updated: ${this.state?.nodes?.length}`);
    return (
      <div className='MainView'>
        {/* for testing GbrEditor stl */}
        <GbrEditor nodeData={this.state?.nodeData}></GbrEditor>

        {/*{this.viewSelector()}*/}

        {/*<button ref={c => this.fileInput = c}> openFile</button>*/}
        {/*<button onClick={()=>{*/}
        {/*  // if(this.state.nodes){*/}
        {/*  //   const gbrCode = GBRCodeGenerator.generateCodeFromNotes(this.state.nodes);*/}
        {/*  //   Utils.download(gbrCode, "generated_gerber.gbr", "text/plain")*/}
        {/*  // }*/}

        {/*  const gbrCode = GBRCodeGenerator.generateCodeFromNotes(this.gbrParser.getNodes());*/}
        {/*  Utils.download(gbrCode, "generated_gerber.gbr", "text/plain")*/}


        {/*}}>save gbr</button>*/}

      </div>
    );
  }
}


//             setReceiverPath(inputRef.current.value);
//             window.electron.ipcRenderer.sendMessage('ipc', {
//               type: EventTypes.StartEmulator,
//               data: { receiverPathApp: inputRef.current.value }
//             });

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainView />} />
        <Route path='/plasmic-host' element={<PlasmicCanvasHost />} />
      </Routes>
    </Router>
  );
}
