import React from "react";
import "./App.css";

const padSize = 600;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.canvasRef = React.createRef();
    this.ctx = null;

    this.isTouchDown = false;
    this.lastPoint = { x: 0, y: 0 };
  }

  p_getPointByEvent = (e) => {
    let x = 0;
    let y = 0;

    let boundingRect = this.canvas.getBoundingClientRect();
    // console.log("bounding rect = ", boundingRect);
    let touchInfo = e.touches[0];
    let { clientX, clientY } = touchInfo;
    x = clientX*2 - boundingRect.x;
    y = clientY*2 - boundingRect.y;

    return { x, y };
  };

  p_onMouseDown = (e) => {
    e.preventDefault();
    console.log("mouse down e: ", e);
    this.isTouchDown = true;
    this.lastPoint = this.p_getPointByEvent(e);
    this.ctx.beginPath();
    this.ctx.moveTo(this.lastPoint.x, this.lastPoint.y);
  };
  p_onMouseMove = (e) => {
    e.preventDefault();
    if (this.isTouchDown) {
      let p = this.p_getPointByEvent(e);
      this.ctx.lineTo(p.x, p.y);
      this.ctx.stroke();
      this.lastPoint = p;
    }
  };
  p_onMouseUp = (e) => {
    e.preventDefault();
    console.log("mouse up");
    this.isTouchDown = false;
  };
  p_onMouseLeave = (e) => {
    e.preventDefault();
    console.log("mouse leave");
    this.isTouchDown = false;
  };

  componentDidMount() {
    const canvas = this.canvasRef.current;
    canvas.width = padSize;
    canvas.height = padSize;
    window.myCanvas = canvas;
    this.canvas = canvas;
    let ctx = canvas.getContext("2d");
    window.ctx = ctx;
    this.ctx = ctx;
    // 绑定鼠标事件
    // this.canvas.addEventListener("mousedown", this.p_onMouseDown);
    // this.canvas.addEventListener("mousemove", this.p_onMouseMove);
    // this.canvas.addEventListener("mouseup", this.p_onMouseUp);
    // this.canvas.addEventListener("mouseleave", this.p_onMouseLeave);

    canvas.addEventListener("touchstart", this.p_onMouseDown);
    canvas.addEventListener("touchmove", this.p_onMouseMove);
    canvas.addEventListener("touchend", this.p_onMouseUp);
    canvas.addEventListener("touchcancel", this.p_onMouseLeave);

    ctx.save();
    // 对角线
    ctx.strokeStyle = "red";
    ctx.lineWidth = 0.5;
    ctx.moveTo(0, 0);
    ctx.lineTo(padSize, padSize);
    ctx.moveTo(padSize, 0);
    ctx.lineTo(0, padSize);
    ctx.stroke();
    ctx.beginPath();
    // ctx.strokeStyle = "blue";
    // ctx.lineWidth = 2;
    // 水平线

    ctx.moveTo(0, padSize / 2);
    ctx.lineTo(padSize, padSize / 2);
    // 垂直线
    ctx.moveTo(padSize / 2, 0);
    ctx.lineTo(padSize / 2, padSize);

    ctx.stroke();
    ctx.restore();

    // 设置颜色和宽度
    // ctx.strokeStyle = "blue";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }

  render() {
    return (
      <div>
        <canvas ref={this.canvasRef} className="pad"></canvas>
      </div>
    );
  }
}

// function App() {
//   return (
//     <div >
//       <div>paint pad</div>
//       <canvas className="pad" width="300" height="300"></canvas>
//     </div>
//   );
// }

export default App;
