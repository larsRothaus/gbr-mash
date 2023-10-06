// This is a skeleton starter React component generated by Plasmic.
// This file is owned by you, feel free to edit as you see fit.
import * as React from 'react';
import { Children } from 'react';

import {
  PlasmicGbrEditorToolBox,
  DefaultGbrEditorToolBoxProps
} from './plasmic/arturel/PlasmicGbrEditorToolBox';
import { HTMLElementRefOf } from '@plasmicapp/react-web';
import { GbrDataModel } from '../renderer/models/GbrDataModel';

type Props = {
  nodeData?: GbrDataModel
  children: any,
  heading: string

};

type State = {
  deltaPosition: { x: number, y: number }
  activeDrags: number,
  open: boolean
};

import Draggable, { DraggableData, DraggableEvent } from 'react-draggable'; // Both at the same time

class GbrToolContainer extends React.Component<Props, State> {

  componentDidMount() {
  }

  state = {
    open: true,
    activeDrags: 0,
    deltaPosition: {
      x: 0, y: 0
    },
    controlledPosition: {
      x: -400, y: 200
    }
  };

  private handleDrag(e: DraggableEvent, data: DraggableData): void {
    const { x, y } = this.state.deltaPosition;
    this.setState({
      deltaPosition: {
        x: x + data.deltaX,
        y: y + data.deltaY
      }
    });
  };

  private onStart() {
    this.setState({ activeDrags: ++this.state.activeDrags });
  };

  private onStop() {
    this.setState({ activeDrags: --this.state.activeDrags });
  };


  render() {
    const { deltaPosition, controlledPosition, open } = this.state;

    return (
      <Draggable handle='strong' >
        <div className='box no-cursor' style={{ display: 'flex', flexDirection: 'column' }}>
          <strong className='cursor' onDoubleClick={() => {
            this.setState({
              open: this.state.open ? false : true
            });
          }}>
            <div>{` |${this.props.heading}| `}</div>
          </strong>
          <div style={{ overflow: 'hidden', height: `${open ? 'auto' : '0px'}`, background: 'gray' , }}>
            {this.props.children}
          </div>
        </div>
      </Draggable>
    );
  }
}

export default GbrToolContainer;

