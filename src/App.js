import React from "react";
import "./App.css";

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
    let touchInfo = e.touches[0];
    let { clientX, clientY } = touchInfo;
    x = clientX - boundingRect.x;
    y = clientY - boundingRect.y;

    return {x, y};
  }

  p_onMouseDown = (e) => {
    console.log("mouse down e: ", e);
    this.isTouchDown = true;
    this.lastPoint = this.p_getPointByEvent(e);
    this.ctx.beginPath();
    this.ctx.moveTo(this.lastPoint.x, this.lastPoint.y);
  };
  p_onMouseMove = (e) => {
    if (this.isTouchDown) {
      let p = this.p_getPointByEvent(e);
      this.ctx.lineTo(p.x, p.y);
      this.ctx.stroke();
      this.lastPoint = p;
    }
  };
  p_onMouseUp = (e) => {
    console.log("mouse up");
    this.isTouchDown = false;
  };
  p_onMouseLeave = (e) => {
    console.log("mouse leave");
    this.isTouchDown = false;
  };

  componentDidMount() {
    this.canvas = this.canvasRef.current;
    window.myCanvas = this.canvas;
    console.log("canvas === ", this.canvas);
    this.ctx = this.canvas.getContext("2d");
    console.log("ctx = ", this.ctx);
    // 绑定鼠标事件
    // this.canvas.addEventListener("mousedown", this.p_onMouseDown);
    // this.canvas.addEventListener("mousemove", this.p_onMouseMove);
    // this.canvas.addEventListener("mouseup", this.p_onMouseUp);
    // this.canvas.addEventListener("mouseleave", this.p_onMouseLeave);

    this.canvas.addEventListener("touchstart", this.p_onMouseDown);
    this.canvas.addEventListener("touchmove", this.p_onMouseMove);
    this.canvas.addEventListener("touchend", this.p_onMouseUp);
    this.canvas.addEventListener("touchcancel", this.p_onMouseLeave);

    let ctx = this.ctx;
    ctx.save();
    // 对角线
    ctx.strokeStyle = "red";
    ctx.lineWidth = 0.5;
    ctx.moveTo(0, 0);
    ctx.lineTo(300, 300);
    ctx.moveTo(300, 0);
    ctx.lineTo(0, 300);
    ctx.stroke();
    ctx.beginPath();
    // ctx.strokeStyle = "blue";
    // ctx.lineWidth = 2;
    // 水平线
    ctx.moveTo(0, 150);
    ctx.lineTo(300, 150);
    // 垂直线
    ctx.moveTo(150, 0);
    ctx.lineTo(150, 300);

    ctx.stroke();
    ctx.restore();

    // 设置颜色和宽度
    // ctx.strokeStyle = "blue";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round"
  }

  render() {
    return (
      <div>
        <div className="pad">
          <canvas ref={this.canvasRef} width="300" height="300"></canvas>
        </div>
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
