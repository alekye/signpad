import React from "react";

// props
/*
  {
    width: 500
  }
*/

class SignPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.background = React.createRef();
    this.paintPad  = React.createRef();
  }

  render() {
    return (
      <div>
        <canvas ref={this.background} ></canvas>
        <canvas ref={this.paintPad}></canvas>
      </div>
    )
  }
}

export default SignPad;