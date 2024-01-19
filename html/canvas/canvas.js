const canvas = document.getElementById("canvas");
const canvasContainer = document.getElementById("canvas-container");
let ctx = null;
function init() {
  // 兼容性测试
  if (canvas.getContext) {
    ctx = canvas.getContext("2d");
    ctx.willReadFrequently = true;
    loadImage("./imgs/map.jpg");
  }
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
 * 清空画布
 */
function clearCanvas() {
  ctx.putImageData(canvasHistory[0], 0, 0);
  canvasHistory = [];
  saveCanvas();
}

/**
 * 加载图片
 */
function loadImage(url) {
  const img = new Image();
  img.src = url;
  img.onload = function () {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    saveCanvas();
  };
}

/**
 *
 */
function getBoundingRect() {
  const canvasRect = canvas.getBoundingClientRect();
  const containerRect = canvasContainer.getBoundingClientRect();
  return {
    left: canvasRect.left - containerRect.left,
    top: canvasRect.top - containerRect.top,
    right: canvasRect.right - containerRect.right,
    bottom: canvasRect.bottom - containerRect.bottom,
  };
  // console.log({
  //   left: canvasRect.left - containerRect.left,
  //   top: canvasRect.top - containerRect.top,
  //   right: canvasRect.right - containerRect.right,
  //   bottom: canvasRect.bottom - containerRect.bottom,
  // });
}
