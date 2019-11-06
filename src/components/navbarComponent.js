import React from "react";
import {KEY_CODES} from "../utils/helper";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

export class NavbarComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      labelModalIsOpen: false,
      colorsModalIsOpen: false,
      valuesModalIsOpen: false
    };
  }

  render() {
    let chartTypes = [];
    for (let key in this.props.chartTypes) 
      chartTypes.push(this.props.chartTypes[key]);
    
    return (
      <div>
        <strong>Assignment OCBC</strong>
      </div>
    );
  }
}
