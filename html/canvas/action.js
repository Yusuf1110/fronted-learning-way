var canvasHistory = [];

var brush = {
  x: 0,
  y: 0,
  radius: 0,
  isDrawing: false,
  drawType: "",
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
};

/**
 * 类型改变
 */
function typeChange(e) {
  brush.drawType = e.target.value;
}

/**
 * 保存当前画布
 */
function saveCanvas() {
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
  canvasHistory.push(data);
}

/**
 * 重绘
 */
function redrawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const len = canvasHistory.length;
  if (len > 0) {
    ctx.putImageData(canvasHistory[len - 1], 0, 0);
  }
}

/**
 * 撤销
 */
function undoCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const len = canvasHistory.length;
  if (len > 0) {
    ctx.putImageData(canvasHistory.pop(), 0, 0);
  }
}

/**
 * actions
 */

const actions = {
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
