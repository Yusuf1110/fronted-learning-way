# 在taro3 小程序开发中使用echarts推荐方案及问题
在taro小程序开发中使用echarts，有各种各样的问题，这里推荐一种简易方案。

## 1. 推荐使用taro-react-echarts这个第三方库

地址：https://github.com/qiuweikangdev/taro-react-echarts

安装：`npm install taro-react-echarts --save`

基本使用方式：
``` javascript
import { useRef } from 'react'
import Echarts from 'taro-react-echarts'
import echarts from '@/assets/js/echarts.js'  // 引入echarts.js文件，这个文件是echarts的核心文件，需要自己去定制下载 https://echarts.apache.org/zh/builder.html

export default function Demo() {
const echartsRef = useRef(null) 
const option = {
    xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
    type: 'value'
    },
    series: [
    {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
    }
    ]
}
return (
    //这里面有不少配置项，可以去仓库地址看一下
    <Echarts
        echarts={echarts}
        option={option}
        ref={echartsRef}
    ></Echarts>
);
}
```

## 2. 注意事项

#### 2.1 若数据是异步的获取的，需要自己写一个state去渲染,不然会不渲染。

```javascript
function MyChart({ unit, current, name, xData, yData, index }) {
  const echartRef = useRef(null);
  const [option, setOption] = useState({
    silent: true,
    triggerEvent: false,
    grid: {
      left: "4%",
      right: "6%",
      bottom: "3%",
      top: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: xData,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        smooth: true,
        selectedMode: false,
        name: "X位移",
        type: "line",
        stack: "Total",
        data: yData,
      },
    ],
  });

  useEffect(() => {
    const temp = JSON.parse(JSON.stringify(option)); //深拷贝
    temp.series[0].data = yData;
    temp.xAxis.data = xData;
    setOption(temp);
  }, [current, yData, xData]);

  return (
    <View
      className="chart-container"
      style={current.has(index) ? "" : { display: "none" }}
    >
      <View className="chart-header">
        <Text className="left">{`${name}(${unit})`}</Text>
      </View>
      <Echarts
        isPage={false}
        lazyUpdate={true}
        option={option}
        echarts={echarts}
        ref={echartRef}
        style={{
          height: 200,
        }}
      ></Echarts>
    </View>
  );
}    
```

#### 2.2 当父组件异步获取完成，echarts实例可能还没初始化，图表不显示

解决方案：在父组件中，异步获取数据后，子组件设置一个延时器，延时200ms，再去设置state，就可以渲染了。

```javascript
useEffect(() => {
    if (Object.keys(data).length == 0) return;

    const temp = JSON.parse(JSON.stringify(option));
    temp.series[0].data = data; //修改数据

    setOption(temp);//更新option

    // 延迟0.2s再更新一次，解决echarts实例还没初始化，图表不显示的问题
    setTimeout(() => {
      setOption(temp);
    }, 200);
  }, [data]);
```

#### 2.3 另一种方式，将option作为函数返回，使用setState每次更新组件时，都会重新渲染,如果要动态渲染数据，可以使用这种方式

```javascript
const option = () => {
    return {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: data //这里使用了state，每次更新组件时，都会重新渲染
        },
        series: [
            {
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line'
            }
        ]
    }
}

reture (
    <Echarts
        echarts={echarts}
        option={option()}
        ref={echartsRef}
    ></Echarts>
);

```

#### 2.4 当多个charts在同一个页面时，上下滑动屏幕可能会出现卡住，无法滑动的情况
解决方案：在这个页面page中设置 overflow-y: hidden; 即可
```css
page {
  overflow-y: hidden;
}
```

## 3. 备注

#### 3.1 解决异步数据不渲染问题，我在作者issue中发现一个解决方案，但是我没有实现,无法获取实例及setData方法，k可以参考一下

```javascript
...
const setData = () => {
    if(sussess.current) {
        return 
    }
    if(echartsRef?.current && data) {
        sussess.current = true
        echartsRef.current.setOption({...})
    }else{
        if(retry.current>0) {  //给一个重试次数重新赋值
            setTimeout(() => {
                setData()
                retry.current--
            }, 300)
        }
    }
}
...
return (
    <Echarts
        echarts={echarts}
        option={option}
        ref={echartsRef}
        onChartReady={(instance)=>{
            echartsRef.current = instance   //将实例赋值给ref
            setData()
        }}
    ></Echarts>
);
...
```
#### 3.2 之前还遇到一个bug，就是如果charts图表在页进入时候隐藏了例如`display:"none"`或者`visibility:"hidden"`,后面再显示，图表会显示不出来。

这个问题我也没解决，只能在一开始就显示出来，然后来隐藏。如果一开始需要隐藏，可以使用`opacity:0`，不过会占位置。