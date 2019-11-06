import { Modal, Button } from "react-bootstrap";
import React from "react";
import { SketchPicker } from "react-color";
import reactCSS from "reactcss";

export class ColorsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayColorPicker: Array(props.columns.length).fill(false),
      colors: Array.apply(null, new Array(props.columns.length)).map(
        (element, index) => props.colors[props.columns[index]]
      )
    };
  }

  componentWillReceiveProps = newProps => {
    this.setState({
      colors: Array.apply(null, new Array(newProps.columns.length)).map(
        (element, index) => newProps.colors[newProps.columns[index]]
      )
    });
  };

  createStyle(color) {
    return {
      width: "36px",
      height: "14px",
      borderRadius: "2px",
      background: color
    };
  }

  openPicker = index => {
    let newState = { ...this.state };
    newState.displayColorPicker[index] = true;
    this.setState(newState);
  };

  handleClose = index => {
    let newState = { ...this.state };
    newState.displayColorPicker[index] = false;
    this.setState(newState);
    this.props.changeColor(index, this.state.colors[index]);
  };

  saveColor = (event, index) => {
    let newState = { ...this.state };
    newState.colors[index] = event.hex;
    this.setState(newState);
  };

  render() {
    const styles = reactCSS({
      default: {
        swatch: {
          padding: "5px",
          background: "#fff",
          borderRadius: "1px",
          boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
          display: "inline-block",
          cursor: "pointer"
        },
        popover: {
          position: "absolute",
          zIndex: "2"
        },
        cover: {
          position: "fixed",
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px"
        }
      }
    });
    return (
      <Modal show={this.props.modalIsOpen} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title">Change colors</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.columns.map((columnName, index) => (
            <div className="color-list-item" key={index}>
              <label
                className="color-list-label"
                htmlFor={"color-input-" + index}
              >
                {columnName}
              </label>
              <div
                style={styles.swatch}
                onClick={() => {
                  this.openPicker(index);
                }}
              >
                <div style={this.createStyle(this.state.colors[index])} />
              </div>
              {this.state.displayColorPicker[index] ? (
                <div style={styles.popover}>
                  <div
                    style={styles.cover}
                    onClick={() => {
                      this.handleClose(index);
                    }}
                  />
                  <SketchPicker
                    color={this.state.colors[index]}
                    onChangeComplete={event => {
                      this.saveColor(event, index);
                    }}
                  />
                </div>
              ) : null}
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
