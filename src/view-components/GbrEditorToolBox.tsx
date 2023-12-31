// This is a skeleton starter React component generated by Plasmic.
// This file is owned by you, feel free to edit as you see fit.
import * as React from 'react';
import {
  PlasmicGbrEditorToolBox,
  DefaultGbrEditorToolBoxProps
} from './plasmic/arturel/PlasmicGbrEditorToolBox';
import { HTMLElementRefOf } from '@plasmicapp/react-web';
import { GbrDataModel } from '../renderer/models/GbrDataModel';

// Your component props start with props for variants and slots you defined
// in Plasmic, but you can add more here, like event handlers that you can
// attach to named nodes in your component.
//
// If you don't want to expose certain variants or slots as a prop, you can use
// Omit to hide them:
//
// interface GbrEditorToolBoxProps extends Omit<DefaultGbrEditorToolBoxProps, "hideProps1"|"hideProp2"> {
//   // etc.
// }
//
// You can also stop extending from DefaultGbrEditorToolBoxProps altogether and have
// total control over the props for your component.
export interface GbrEditorToolBoxProps extends DefaultGbrEditorToolBoxProps {

}

function GbrEditorToolBox_(
  props: GbrEditorToolBoxProps,
  ref: HTMLElementRefOf<'div'>
) {
  // Use PlasmicGbrEditorToolBox to render this component as it was
  // designed in Plasmic, by activating the appropriate variants,
  // attaching the appropriate event handlers, etc.  You
  // can also install whatever React hooks you need here to manage state or
  // fetch data.
  //
  // Props you can pass into PlasmicGbrEditorToolBox are:
  // 1. Variants you want to activate,
  // 2. Contents for slots you want to fill,
  // 3. Overrides for any named node in the component to attach behavior and data,
  // 4. Props to set on the root node.
  //
  // By default, we are just piping all GbrEditorToolBoxProps here, but feel free
  // to do whatever works for you.

  return;
}


type Props = {
  nodeData?: GbrDataModel
};

type State = {
  deltaPosition: { x: number, y: number }
  activeDrags: number,
  open: boolean
};

import Draggable, { DraggableCore, DraggableData, DraggableEvent } from 'react-draggable'; // Both at the same time

class GbrEditorToolBox extends React.Component<Props, State> {

  componentDidMount() {

  }


  render() {

    return (
      <div>
        <PlasmicGbrEditorToolBox
          deselectAction={() => {
            this.props.nodeData?.deselectAll();
          }}
          joinSelected={() => {
            this.props.nodeData?.joinSelected();
          }}
          removeMoveNodes={() => {
            this.props.nodeData?.removeMoveNodes();
          }}
          reverseNode={() => {
            this.props.nodeData?.reverseSelectedNode();
          }}
          generateToolPath={() => {
            this.props.nodeData?.generateToolPath();
          }}
          saveFile={() => {
            this.props.nodeData?.saveWorkFile();
          }}
        />
      </div>
    )

  }
}

export default GbrEditorToolBox;


// // This is a skeleton starter React component generated by Plasmic.
// // This file is owned by you, feel free to edit as you see fit.
// import * as React from 'react';
// import {
//   PlasmicGbrEditorToolBox,
//   DefaultGbrEditorToolBoxProps
// } from './plasmic/arturel/PlasmicGbrEditorToolBox';
// import { HTMLElementRefOf } from '@plasmicapp/react-web';
// import { GbrDataModel } from '../renderer/models/GbrDataModel';
//
// // Your component props start with props for variants and slots you defined
// // in Plasmic, but you can add more here, like event handlers that you can
// // attach to named nodes in your component.
// //
// // If you don't want to expose certain variants or slots as a prop, you can use
// // Omit to hide them:
// //
// // interface GbrEditorToolBoxProps extends Omit<DefaultGbrEditorToolBoxProps, "hideProps1"|"hideProp2"> {
// //   // etc.
// // }
// //
// // You can also stop extending from DefaultGbrEditorToolBoxProps altogether and have
// // total control over the props for your component.
// export interface GbrEditorToolBoxProps extends DefaultGbrEditorToolBoxProps {
//
// }
//
// function GbrEditorToolBox_(
//   props: GbrEditorToolBoxProps,
//   ref: HTMLElementRefOf<'div'>
// ) {
//   // Use PlasmicGbrEditorToolBox to render this component as it was
//   // designed in Plasmic, by activating the appropriate variants,
//   // attaching the appropriate event handlers, etc.  You
//   // can also install whatever React hooks you need here to manage state or
//   // fetch data.
//   //
//   // Props you can pass into PlasmicGbrEditorToolBox are:
//   // 1. Variants you want to activate,
//   // 2. Contents for slots you want to fill,
//   // 3. Overrides for any named node in the component to attach behavior and data,
//   // 4. Props to set on the root node.
//   //
//   // By default, we are just piping all GbrEditorToolBoxProps here, but feel free
//   // to do whatever works for you.
//
//   return;
// }
//
//
// type Props = {
//   nodeData?: GbrDataModel
// };
//
// type State = {
//   deltaPosition: { x: number, y: number }
//   activeDrags: number,
//   open: boolean
// };
//
// import Draggable, { DraggableCore, DraggableData, DraggableEvent } from 'react-draggable'; // Both at the same time
//
// class GbrEditorToolBox extends React.Component<Props, State> {
//
//   componentDidMount() {
//     this.setState({
//       open: true,
//       activeDrags: 0,
//       deltaPosition: {
//         x: 0, y: 0
//       }
//       // controlledPosition: {
//       //   x: -400, y: 200
//       // }
//     });
//   }
//
//   state = {
//     open: true,
//     activeDrags: 0,
//     deltaPosition: {
//       x: 0, y: 0
//     },
//     controlledPosition: {
//       x: -400, y: 200
//     }
//   };
//
//   private handleDrag(e: DraggableEvent, data: DraggableData): void {
//     const { x, y } = this.state.deltaPosition;
//     this.setState({
//       deltaPosition: {
//         x: x + data.deltaX,
//         y: y + data.deltaY
//       }
//     });
//   };
//
//   private onStart() {
//     this.setState({ activeDrags: ++this.state.activeDrags });
//   };
//
//   private onStop() {
//     this.setState({ activeDrags: --this.state.activeDrags });
//   };
//
//   // private onDrop (e) {
//   //   this.setState({activeDrags: --this.state.activeDrags});
//   //   if (e.target.classList.contains("drop-target")) {
//   //     alert("Dropped!");
//   //     e.target.classList.remove('hovered');
//   //   }
//   // };
//   // private onDropAreaMouseEnter (e) {
//   //   if (this.state.activeDrags) {
//   //     e.target.classList.add('hovered');
//   //   }
//   // }
//   // private onDropAreaMouseLeave (e) {
//   //   e.target.classList.remove('hovered');
//   // }
//   //
//   // // For controlled component
//   // private adjustXPos (e) {
//   //   e.preventDefault();
//   //   e.stopPropagation();
//   //   const {x, y} = this.state.controlledPosition;
//   //   this.setState({controlledPosition: {x: x - 10, y}});
//   // };
//   //
//   // private adjustYPos (e) {
//   //   e.preventDefault();
//   //   e.stopPropagation();
//   //   const {controlledPosition} = this.state;
//   //   const {x, y} = controlledPosition;
//   //   this.setState({controlledPosition: {x, y: y - 10}});
//   // };
//   //
//   // private onControlledDrag (e, position) {
//   //   const {x, y} = position;
//   //   this.setState({controlledPosition: {x, y}});
//   // };
//   //
//   // private onControlledDragStop (e, position) {
//   //   this.onControlledDrag(e, position);
//   //   this.onStop();
//   // };
//
//   render() {
//     const { deltaPosition, controlledPosition, open } = this.state;
//
//     return (
//       <Draggable handle='strong'>
//         <div className='box no-cursor' style={{ display: 'flex', flexDirection: 'column' }} onDoubleClick={() => {
//           console.log(`## [GbrEditorToolBox] Change open...`);
//             this.setState({
//               open: this.state.open ? false : true
//             })
//         }}>
//           <strong className='cursor'>
//             <div>| Tool |</div>
//           </strong>
//           <div style={{ overflow: 'scroll', height: `${open ? 'auto' : '0px'}` }}>
//             <PlasmicGbrEditorToolBox
//               deselectAction={() => {
//                 this.props.nodeData?.deselectAll();
//               }}
//               joinSelected={() => {
//                 this.props.nodeData?.joinSelected();
//               }}
//               removeMoveNodes={() => {
//                 this.props.nodeData?.removeMoveNodes();
//               }}
//               reverseNode={() => {
//                 this.props.nodeData?.reverseSelectedNode();
//               }}
//               generateToolPath={() => {
//                 this.props.nodeData?.generateToolPath();
//               }}
//               saveFile={() => {
//                 this.props.nodeData?.saveWorkFile();
//               }}
//             />
//           </div>
//         </div>
//       </Draggable>
//       // <Draggable
//       //   // axis='x'
//       //   // handle='.handle'
//       //   // defaultPosition={{ x: 0, y: 0 }}
//       //   // grid={[25, 25]}
//       //   // scale={1}
//       //   // disabled={false}
//       //   // onStart={this.onStart.bind(this)}
//       //   onDrag={this.handleDrag.bind(this)}
//       //   // onStop={this.onStop.bind(this)}
//       //  >
//       //   <PlasmicGbrEditorToolBox
//       //     deselectAction={() => {
//       //       this.props.nodeData?.deselectAll();
//       //     }}
//       //     joinSelected={() => {
//       //       this.props.nodeData?.joinSelected();
//       //     }}
//       //     removeMoveNodes={() => {
//       //       this.props.nodeData?.removeMoveNodes();
//       //     }}
//       //     reverseNode={() => {
//       //       this.props.nodeData?.reverseSelectedNode();
//       //     }}
//       //     generateToolPath={() => {
//       //       this.props.nodeData?.generateToolPath();
//       //     }}
//       //     saveFile={() => {
//       //       this.props.nodeData?.saveWorkFile();
//       //     }}
//       //   />
//       // </Draggable>
//
//     );
//   }
// }
//
// export default GbrEditorToolBox;
//
