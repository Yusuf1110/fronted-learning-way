const canvas = document.getElementById("canvas");
let ctx = null;
function init() {
  // 兼容性测试
  if (canvas.getContext) {
    ctx = canvas.getContext("2d");
    ctx.willReadFrequently = true;
  }
}
