var canvasHistory = [];

var brush = {
  baseOffset: {
    x: 0,
    y: 0,
    scale: 1,
    // origin: {
    //   x: 0,
    //   y: 0,
    // },
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
  drawCicle: function (radius) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI, true);
    ctx.fillStyle = this.color;
    ctx.fill();
  },
  drawText: function (text, x, y) {
    ctx.beginPath();
    ctx.font = "16px Arial";
    ctx.fillStyle = this.color;
    ctx.fillText(text, x, y);
  },
  transform: function (e) {
    const baseOffset = this.baseOffset;
    baseOffset.scale = Math.min(Math.max(baseOffset.scale, 1), 10);
    let w = ((baseOffset.scale - 1) * canvas.width) / 2;
    let h = ((baseOffset.scale - 1) * canvas.height) / 2;
    if (baseOffset.x > w) {
      baseOffset.x = w;
    } else if (baseOffset.x < -w) {
      baseOffset.x = -w;
    }
    if (baseOffset.y > h) {
      baseOffset.y = h;
    } else if (baseOffset.y < -h) {
      baseOffset.y = -h;
    }
    // canvas.style.transformOrigin = `${brush.baseOffset.origin.x}px ${brush.baseOffset.origin.y}px`;
    canvas.style.transform = `translate(${baseOffset.x}px, ${baseOffset.y}px) scale(${baseOffset.scale})`;
  },
};

/**
 * 类型改变
 */
function typeChange(e) {
  brush.drawType = e.target.value;
}

/**
 * 测距
 */
function getDistance(points1, points2) {
  return Math.sqrt(
    Math.pow(points1.x - points2.x, 2) + Math.pow(points1.y - points2.y, 2)
  );
}

/**
 * actions
 */
const actions = {
  base: {
    mousedown(e) {
      brush.x = e.offsetX;
      brush.y = e.offsetY;
      brush.isDrawing = true;
    },
    mouseup(e) {
      brush.isDrawing = false;
    },
    mousemove(e) {
      if (!brush.isDrawing) {
        return;
      }
      const baseOffset = brush.baseOffset;
      baseOffset.x += e.offsetX - brush.x;
      baseOffset.y += e.offsetY - brush.y;

      brush.transform();
    },
    mouseleave(e) {
      brush.isDrawing = false;
    },
    wheel(e) {
      brush.baseOffset.scale += e.deltaY < 0 ? 0.1 : -0.1;
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
    wheel(e) {
      brush.baseOffset.scale += e.deltaY < 0 ? 0.1 : -0.1;
      brush.transform();
    },
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
    wheel(e) {
      brush.baseOffset.scale += e.deltaY < 0 ? 0.1 : -0.1;
      brush.transform();
    },
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
    wheel(e) {
      brush.baseOffset.scale += e.deltaY < 0 ? 0.1 : -0.1;
      brush.transform();
    },
  },

  // 绘制圆
  cicle: {
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
      const redius = getDistance(
        { x: brush.x, y: brush.y },
        { x: e.offsetX, y: e.offsetY }
      );
      brush.drawCicle(redius);
    },
    mouseleave(e) {},
    wheel(e) {
      brush.baseOffset.scale += e.deltaY < 0 ? 0.1 : -0.1;
      brush.transform();
    },
  },

  // 测距
  measure: {
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
      const res = getDistance(
        { x: brush.x, y: brush.y },
        { x: e.offsetX, y: e.offsetY }
      );
      brush.drawText(res, e.offsetX, e.offsetY);
      brush.drawLine(e.offsetX, e.offsetY);
    },
    mouseleave(e) {},
    wheel(e) {
      brush.baseOffset.scale += e.deltaY < 0 ? 0.1 : -0.1;
      brush.transform();
    },
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
