# 预备知识

画布：画布的特点包括尺寸（宽度和高度）、分辨率和背景颜色。

图层：图层是画布上的独立图像或图形组。一个画布可以包含多个图层

路径：路径是一系列的直线、曲线和其他几何元素的组合

# 注意点

1、canvas标签有两个属性width和height。DOM properties 来设置。当没有设置宽度和高度的时候，canvas会初始化 宽度为 300 像素和高度为 150 像素。

2、</canvas> 标签不可省,标签包裹是替代内容。若省略其余部分会被认为是替代内容，将不会显示出来。

3、坐标系:

![url](imgs/canvas_default_grid.png)

# 兼容性

IE9 之前的 IE 浏览器或者文本浏览器不支持。老版本IE可以引入

1、显示兼容元素，进行容错
```html
<canvas id="clock" width="150" height="150">
  <img src="images/clock.png" width="150" height="150" alt="" /> 
</canvas>
```

2、兼容性检查

```js
var canvas = document.getElementById("tutorial");

if (canvas.getContext) {
  var ctx = canvas.getContext("2d");
  // drawing code here
} else {
  // canvas-unsupported code here
}
```

# 使用 canvas 绘图

1、绘制路径：
图形的基本元素是路径。路径是通过不同颜色和宽度的线段或曲线相连形成的不同形状的点的集合。一个路径，甚至一个子路径，都是闭合的。使用路径绘制图形需要一些额外的步骤。
beginPath(): 开始、重置路径
moveTo() 
closePath(): 闭合路径
stroke(): 绘制路径
fill(): 填充路径

clip()：将当前正在构建的路径转换为当前的裁剪路径。

2、状态的保存和恢复
save()
restore()

3、移动、旋转和缩放
画布、原点


# 使用 canvas 处理图片

"DPI" 代表每英寸点数（Dots Per Inch），
imageSmoothingEnabled 
<img>  <video>  <canvas>
ImageBitmap
drawImage(image, x, y)
drawImage(image, x, y, width, height)
drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)

# 使用 canvas 处理视频

# canvas 优化
CSS transforms 使用 GPU，因此速度更快。最好的情况是不直接缩放画布，或者具有较小的画布并按比例放大，而不是较大的画布并按比例缩小。
