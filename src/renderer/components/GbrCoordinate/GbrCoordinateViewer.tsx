/** *************************** **/
/// Class: GbrCoordinateViewer
// Lars Rothaus --> 13/10/2023
/** *************************** **/

import React from "react";
import GbrCoordinateView from '../../../view-components/GbrCoordinateView';

type Props = {
};

type State = {
};

class GbrCoordinateViewer extends React.Component<Props, State> {



  componentDidMount() {

  }

  // componentWillReceiveProps(){}
  // componentWillUpdate(){}
  // componentDidUpdate() {}

  render() {
    return (
      <GbrCoordinateView/>
    );
  }
}

export default GbrCoordinateViewer
