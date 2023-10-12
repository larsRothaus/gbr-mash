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

type Props = {};

type State = {
  nodes?: GbrNode[],
  nodeData?: GbrDataModel
};

class MainView extends React.Component<Props, State> {

  componentDidMount() {

  }


  render() {
    console.log(`## [App] render | updated: ${this.state?.nodes?.length}`);
    return (
      <div className='MainView'>
        <GbrEditor />
      </div>
    );
  }
}


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
