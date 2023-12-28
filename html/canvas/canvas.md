# 注意点
1、canvas标签只有两个属性width和height。DOM properties 来设置。当没有设置宽度和高度的时候，canvas会初始化 宽度为 300 像素和高度为 150 像素。

2、</canvas> 标签不可省,标签包裹是替代内容。若省略其余部分会被认为是替代内容，将不会显示出来。

3、坐标系:

![url](imgs/canvas_default_grid.png)

# 兼容性
IE9 之前的 IE 浏览器或者文本浏览器不支持

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

