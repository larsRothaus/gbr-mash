// This is a skeleton starter React component generated by Plasmic.
// This file is owned by you, feel free to edit as you see fit.
import * as React from 'react';
import {
  PlasmicGbrFrameTool,
  DefaultGbrFrameToolProps,
} from './plasmic/arturel/PlasmicGbrFrameTool';
import { HTMLElementRefOf } from '@plasmicapp/react-web';

// Your component props start with props for variants and slots you defined
// in Plasmic, but you can add more here, like event handlers that you can
// attach to named nodes in your component.
//
// If you don't want to expose certain variants or slots as a prop, you can use
// Omit to hide them:
//
// interface GbrFrameToolProps extends Omit<DefaultGbrFrameToolProps, "hideProps1"|"hideProp2"> {
//   // etc.
// }
//
// You can also stop extending from DefaultGbrFrameToolProps altogether and have
// total control over the props for your component.
export interface GbrFrameToolProps extends DefaultGbrFrameToolProps {}

function GbrFrameTool_(props: GbrFrameToolProps, ref: HTMLElementRefOf<'div'>) {
  // Use PlasmicGbrFrameTool to render this component as it was
  // designed in Plasmic, by activating the appropriate variants,
  // attaching the appropriate event handlers, etc.  You
  // can also install whatever React hooks you need here to manage state or
  // fetch data.
  //
  // Props you can pass into PlasmicGbrFrameTool are:
  // 1. Variants you want to activate,
  // 2. Contents for slots you want to fill,
  // 3. Overrides for any named node in the component to attach behavior and data,
  // 4. Props to set on the root node.
  //
  // By default, we are just piping all GbrFrameToolProps here, but feel free
  // to do whatever works for you.

  return <PlasmicGbrFrameTool root={{ ref }} {...props} />;
}

const GbrFrameTool = React.forwardRef(GbrFrameTool_);
export default GbrFrameTool;