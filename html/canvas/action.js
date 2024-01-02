var canvasHistory = [];

var brush = {
  baseOffset: {
    x: 0,
    y: 0,
    scale: 1,
    origin: {
      x: 0,
      y: 0,
    },
  },
  x: 0,
  y: 0,
  radius: 0,
  isDrawing: false,
  drawType: "base",
  color: "rgb(0,0,0)",
  drawLine: function (x, y) {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(x, y);
    ctx.fillStyle = this.color;
    ctx.stroke();
  },
  drawRect: function (x, y) {
    ctx.beginPath();
    ctx.fillRect(this.x, this.y, x, y);
    ctx.fillStyle = this.color;
    ctx.fill();
  },
  drawText: function (x, y) {
    ctx.beginPath();
    ctx.font = "16px Arial";
    ctx.fillStyle = this.color;
    ctx.fillText(brush.drawType, this.x, this.y);
  },
  transform: function (e) {
    var { x, y, scale } = this.baseOffset;
    canvas.style.transformOrigin = `${brush.baseOffset.origin.x}px ${brush.baseOffset.origin.y}px`;
    canvas.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
  },
};

/**
 * 类型改变
 */
function typeChange(e) {
  brush.drawType = e.target.value;
}

/**
 * actions
 */
const actions = {
  base: {
    mousedown(e) {
      brush.x = e.offsetX;
      brush.y = e.offsetY;
      brush.baseOffset.origin.x = 0;
      brush.baseOffset.origin.y = 0;
      brush.isDrawing = true;
    },
    mouseup(e) {
      brush.isDrawing = false;
    },
    mousemove(e) {
      if (!brush.isDrawing) {
        return;
      }
      let baseOffset = brush.baseOffset;
      let w = canvas.width - baseOffset.scale * canvas.width;
      let h = canvas.height - baseOffset.scale * canvas.height;
      brush.baseOffset.x += e.offsetX - brush.x;
      brush.baseOffset.y += e.offsetY - brush.y;
      brush.baseOffset.x = Math.min(Math.max(brush.baseOffset.x, w), 0);
      brush.baseOffset.y = Math.min(Math.max(brush.baseOffset.y, h), 0);
      brush.transform();
    },
    mouseleave(e) {
      brush.isDrawing = false;
    },
    wheel(e) {
      console.log(e);
      let scale = brush.baseOffset.scale + (e.deltaY > 0 ? 0.1 : -0.1);
      brush.baseOffset.scale = Math.min(Math.max(scale, 1), 10);
      brush.baseOffset.origin.x = "center";
      brush.baseOffset.origin.y = "center";
      brush.transform();
    },
  },
  // 线
  line: {
    mousedown(e) {
      brush.x = e.offsetX;
      brush.y = e.offsetY;
      brush.isDrawing = true;
    },
    mouseup(e) {
      brush.isDrawing = false;
      saveCanvas();
    },
    mousemove(e) {
      if (!brush.isDrawing) {
        return;
      }
      brush.drawLine(e.offsetX, e.offsetY);
      brush.x = e.offsetX;
      brush.y = e.offsetY;
    },
    mouseleave(e) {},
  },

  // 直线
  straightLine: {
    mousedown(e) {
      brush.x = e.offsetX;
      brush.y = e.offsetY;
      brush.isDrawing = true;
    },
    mouseup(e) {
      brush.isDrawing = false;
      saveCanvas();
    },
    mousemove(e) {
      if (!brush.isDrawing) {
        return;
      }
      redrawCanvas();
      brush.drawLine(e.offsetX, e.offsetY);
    },
    mouseleave(e) {},
  },

  // 矩形
  rectangle: {
    mousedown(e) {
      brush.x = e.offsetX;
      brush.y = e.offsetY;
      brush.isDrawing = true;
    },
    mouseup(e) {
      brush.isDrawing = false;
      saveCanvas();
    },
    mousemove(e) {
      if (!brush.isDrawing) {
        return;
      }
      redrawCanvas();
      brush.drawRect(e.offsetX - brush.x, e.offsetY - brush.y);
    },
    mouseleave(e) {},
  },
};

/**
 * 绑定事件
 */
canvas.addEventListener("mousedown", (e) => {
  actions[brush.drawType]?.mousedown(e);
});
canvas.addEventListener("mousemove", (e) => {
  actions[brush.drawType]?.mousemove(e);
});
canvas.addEventListener("mouseup", (e) => {
  actions[brush.drawType]?.mouseup(e);
});
canvas.addEventListener("mouseleave", function (e) {
  actions[brush.drawType]?.mouseleave(e);
});
canvas.addEventListener("wheel", function (e) {
  actions[brush.drawType]?.wheel(e);
});
