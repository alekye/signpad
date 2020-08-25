import React from "react";
import Utils from "./Utils";
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
    // console.log("bounding rect = ", boundingRect);
    let touchInfo = {};
    if (Utils.isMobile()) {
      touchInfo = e.touches[0];
    } else {
      touchInfo = e;
    }
    let { clientX, clientY } = touchInfo;
    x = clientX - boundingRect.x;
    y = clientY - boundingRect.y;

    return { x, y };
  };

  p_onMouseDown = (e) => {
    e.preventDefault();
    // console.log("mouse down e: ", e);
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
    let screenWidth = window.screenWidth;
    if (Utils.isMobile()) {
      screenWidth = window.screen.width;
    } else {
      screenWidth = Math.min(window.innerHeight, window.innerWidth);
    }
    let margin = 10;
    // const padSize = 600;
    let dpr = window.devicePixelRatio;
    console.log("dpr = ", dpr);
    const canvas = this.canvasRef.current;
    const boundingRect = canvas.getBoundingClientRect();
    console.log("bounding rect = ", boundingRect);
    const canvasWidth = screenWidth - margin * 2;
    console.log("canvasWidth = ", canvasWidth);
    canvas.width = canvasWidth * dpr;
    canvas.height = canvasWidth * dpr;
    canvas.style.marginLeft = `${margin}px`;
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasWidth}px`;
    // console.log("canvas style = ", canvas.style);
    // canvas.style.width = `${canvasWidth}px`;
    // canvas.state.height = `${canvasWidth}px`;

    // '1px' 这样的字符串转数字
    // let borderWidth = getComputedStyle(canvas).borderWidth;
    // borderWidth = parseInt(borderWidth);
    // console.log("border width = ", borderWidth, " type = ", typeof borderWidth);
    // canvas.width = (boundingRect.width - borderWidth*2)*dpr;
    // canvas.height = (boundingRect.height - borderWidth*2)*dpr;

    window.myCanvas = canvas;
    this.canvas = canvas;
    let ctx = canvas.getContext("2d");
    window.ctx = ctx;
    this.ctx = ctx;
    // 修改坐标的比率
    ctx.scale(dpr, dpr);

    ctx.save();
    ctx.beginPath();
    // 设置样式
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = "red";
    // 绘制对角线
    ctx.moveTo(0, 0);
    ctx.lineTo(canvasWidth, canvasWidth);
    ctx.moveTo(0, canvasWidth);
    ctx.lineTo(canvasWidth, 0);

    // 十字线
    ctx.moveTo(canvasWidth / 2, 0);
    ctx.lineTo(canvasWidth / 2, canvasWidth);
    ctx.moveTo(0, canvasWidth / 2);
    ctx.lineTo(canvasWidth, canvasWidth / 2);

    ctx.stroke();
    ctx.restore();

    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    // 绑定鼠标事件
    // this.canvas.addEventListener("mousedown", this.p_onMouseDown);
    // this.canvas.addEventListener("mousemove", this.p_onMouseMove);
    // this.canvas.addEventListener("mouseup", this.p_onMouseUp);
    // this.canvas.addEventListener("mouseleave", this.p_onMouseLeave);
    if (Utils.isMobile()) {
      canvas.addEventListener("touchstart", this.p_onMouseDown);
      canvas.addEventListener("touchmove", this.p_onMouseMove);
      canvas.addEventListener("touchend", this.p_onMouseUp);
      canvas.addEventListener("touchcancel", this.p_onMouseLeave);
    } else {
      canvas.addEventListener("mousedown", this.p_onMouseDown);
      canvas.addEventListener("mousemove", this.p_onMouseMove);
      canvas.addEventListener("mouseup", this.p_onMouseUp);
      canvas.addEventListener("mouseleave", this.p_onMouseLeave);
    }
  }

  render() {
    return (
      <div>
        <canvas ref={this.canvasRef} className="pad"></canvas>
      </div>
    );
  }
}

export default App;
