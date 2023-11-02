### JSX 会让你把标签放到 JavaScript 中。而大括号{}会让你 “回到” JavaScript 中
例如：
```js
    return (
        <h1 className="avatar">  //这里不解析，就是字符串
        {user.name}  //里面解析js
        </h1>
    );
```

### 更新界面，组件中声明一个 state 变量，[something, setSomething] 为它们命名。
例如：
```js
    function MyButton() {
     const [count, setCount] = useState(0); //count 的值为 0，把 0 传给了 useState()
     function handleClick() {
     setCount(count + 1);
     } 
    return (
      <button onClick={handleClick}>
        Clicked {count} times
        </button>
     );
    }
    export default function MyApp() {
    return (
        <div>
        <h1>Counters that update separately</h1>
        <MyButton /> //相互独立不影响，每次创建自己的state。但是在同一个位置渲染不同的jsx代码，就会影响。
        <MyButton />
        </div>
    );
    }
```

### 当用对象作为state时,为了真正地触发一次重新渲染，需要创建一个新对象并把它传递给 state 的设置函数
将 state 视为只读的,React 并不知道对象已更改。所以 React 没有做出任何响应。虽然在一些情况下，直接修改 state 可能是有效的，但我们并不推荐这么做。你应该把在渲染过程中可以访问到的 state 视为只读的。
```js
    const  [a,setA] = useState([])
    setA(a.push[1])//没效
    setA(a.slice().push[1])//有效
```

### 共享数据并一起更新，将子级的 state 上移到父级中

```js
    import { useState } from 'react';

    export default function MyApp() {
    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(count + 1);
    }
    return (
        <div>
        <h1>Counters that update together</h1>
        <MyButton count={count} onClick={handleClick} />
        <MyButton count={count} onClick={handleClick} />
        </div>
    );
    }

    function MyButton({ count, onClick }) {
    return (
        <button onClick={onClick}>
        Clicked {count} times
        </button>
    );
    }
```    

### 对 React 来说重要的是组件在 UI 树中的位置,而不是在 JSX 中的位置，如果有两个一样的组件在同一个地方渲染，那么会共享state，绑定key就可以独立。
指定一个 key 能够让 React 将 key 本身而非它们在父组件中的顺序作为位置的一部分。这就是为什么尽管你用 JSX 将组件渲染在相同位置，但在 React 看来它们是两个不同的计数器。因此它们永远都不会共享 state。每当一个计数器出现在屏幕上时，它的 state 会被创建出来。每当它被移除时，它的 state 就会被销毁。在它们之间切换会一次又一次地使它们的 state 重置。

### 让两个 Counter 各自独立的话，可以将它们渲染在不同的位置。
```js
     <div>
      {isPlayerA &&
        <Counter person="Taylor" />
      }
      {!isPlayerA &&
        <Counter person="Sarah" />
      }
      <button onClick={() => {
        setIsPlayerA(!isPlayerA);
      }}>
        下一位玩家！
      </button>
    </div>
```
起初 isPlayerA 的值是 true。所以第一个位置包含了 Counter 的 state，而第二个位置是空的。
当你点击“下一位玩家”按钮时，第一个位置会被清空，而第二个位置现在包含了一个 Counter。
### 组件从 DOM 中移除时,它的 state 就会被销毁。

### 避免多级传递Props。可以将jsx作为子组件传递
```js
    function Card({ children }) {  //这里需要解构出children
    return (
        <div className="card">
        {children}
        </div>
    );
    }

    export default function Profile() {
    return (
        <Card>
        <Avatar   
            size={100}
            person={{ 
            name: 'Katsuko Saruhashi',
            imageId: 'YfeOqp2'
            }}
        />
        </Card>
    );
    }
```
### props 是不可变的，组件需要改变它的 props，它不得不“请求”它的父组件传递不同的 props
也就是子组件接受父组件的方法，然后调用方法，改变父组件的state，然后父组件重新渲染，子组件也会重新渲染。

### 声明 Effect，默认情况下，Effect 会在每次渲染后都会执行。具体渲染方式由第二个参数控制
```js
    useEffect(() => {
    // 这里是 Effect 的函数体,每次渲染都会执行
    });

    useEffect(() => {
    // 这里是 Effect 的函数体,只有在count改变时才会执行
    }, [count]);

    useEffect(() => {
    // 这里是 Effect 的函数体,只有在name改变时才会执行
    }, [count, name]);

    useEffect(() => {
    // 这里是 Effect 的函数体,只会在第一次渲染时执行
    }, []);
```

### 你可以在 Effect 中返回一个函数（return），这个函数会在组件被卸载/渲染时执行

### 若对一个state有大量逻辑操作，可以使用reducer管理 
```js
import { useReducer } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);  //替换useState，第一个参数是reducer函数,第二个是初始值

  // 每次调用此方法会派发一个action对象到tasksReducer中。tasksReducer执行一次。
  function handleAddTask(text) {
    dispatch({  //dispatch 方法中就是 action对象
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId,
    });
  }

  return (
    <>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

// 这个可以抽出单文件
function tasksReducer(tasks, action) { //第一个参数是state，第二个是派发的action对象
  switch (action.type) {
    case 'added': {
      return [  //return 出去的就是setState更新内容
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case 'changed': {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('未知 action: ' + action.type);
    }
  }
}

let nextId = 3;
const initialTasks = [
  {id: 0, text: '参观卡夫卡博物馆', done: true},
  {id: 1, text: '看木偶戏', done: false},
  {id: 2, text: '打卡列侬墙', done: false}
];

```

### 使用 Immer 简化 reducers
```js
import { useImmerReducer } from 'use-immer'; //使用Immer这个库

function tasksReducer(draft, action) { 
//和reducer的区别就是第一个参数，Immer 会基于当前 state 创建一个副本。我们不需要return，直接修改draft。就好像在修改state。
  switch (action.type) {
    case 'added': {
      draft.push({ //直接修改draft，就会触发setState
        id: action.id,
        text: action.text,
        done: false,
      });
      break;
    }
    case 'changed': {
      const index = draft.findIndex((t) => t.id === action.task.id);
      draft[index] = action.task;
      break;
    }
    case 'deleted': {
      return draft.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('未知 action：' + action.type);
    }
  }
}

export default function TaskApp() {
  const [tasks, dispatch] = useImmerReducer(tasksReducer, initialTasks);
  ...

```

### 使用createContext将props传入到深层组件

```js
// app.js
import Father from './father.js';
import Child from './child.js';
import Other from './other.js';

export default function ProfilePage() {
  return (
    <Father> //  设置 1
      <Child>My Profile</Child>  // 收到 1
      <Father >  // 收到 1 设置 2
        <Child>My Profile</Child> // 收到 2
        <Father> // 收到 2 设置 3
            <Child>My Profile</Child>  // 收到 3
        </Father>
      </Father>
      <Other> //未设置
        <Other> // 未设置
            <Child> //收到1
            </Child>
        </Other>
      </Other>
    </Father>
  );
}
 
// LevelContext.js
import { createContext } from 'react';

export const LevelContext = createContext(0); // 创建一个context


// father.js
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Father({ children, isFancy }) {
  const level = useContext(LevelContext);
  return (
    <section>
      <LevelContext.Provider value={level + 1}> // 在外部父组件使用LevelContext.Provider更新context的value
        {children} // 子组件会拿到到最靠近他的一个context的value
      </LevelContext.Provider>
    </section>
  );
}

// children.js
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Children({ children }) {
  const level = useContext(LevelContext); // 使用useContext获取value，这个value是最近长辈组件中LevelContext.Provider设置的value，若没有设置就是初始
  switch (level) {
    case 0:
      throw Error('Heading 必须在 Section 内部！');
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    default:
      throw Error('未知的 level：' + level);
  }
}

```

### 【hook】useDeferredValue  可以让你延迟组件更新，根据设备性能的、自动的防抖策略
> 与防抖或节流不同，useDeferredValue 不需要选择任何固定延迟时间。如果用户的设备很快（比如性能强劲的笔记本电脑），延迟的重渲染几乎会立即发生并且不会被察觉。如果用户的设备较慢，那么列表会相应地“滞后”于输入，滞后的程度与设备的速度有关。useDeferredValue 执行的延迟重新渲染默认是可中断的。这意味着，如果 React 正在重新渲染一个大型列表，但用户进行了另一次键盘输入，React 会放弃该重新渲染，先处理键盘输入，然后再次开始在后台渲染。相比之下，防抖和节流仍会产生不顺畅的体验，它们仅仅是将渲染阻塞键盘输入的时刻推迟了。

> 如果你要优化的工作不是在渲染期间发生的，那么防抖和节流仍然非常有用。例如，它们可以让你减少网络请求的次数。你也可以同时使用这些技术。

### 【hook】useId 可以生成唯一ID。
> 你应该在以下情况下使用 useId：
> 你想生成唯一 ID。在 React 中直接编写 ID 并不是一个好的习惯。一个组件可能会在页面上渲染多次，但是 ID 必须是唯一的
> 你想要连接 HTML 元素，比如 label 和 input。
> 如果你需要为多个相关元素生成 ID，可以调用 useId 来为它们生成共同的前缀：

> 在以下情况下不应该使用 useId：  
> 映射列表后需要 key。
> 你正在使用不可变的值。

### 【hook】useImperativeHandle 向父组件暴露一个子组件ref语柄（一些子组件方法）
> 父组件调子组件方法
当然也可以父传子一个state，子用useEffect监听，调子方法。 其实基本都可以靠副作用完成

### 【hook】useLayoutEffect vs useEffect
> useLayoutEffect 是 useEffect 的一个版本，在浏览器重新绘制屏幕之前触发，阻塞浏览器重新绘制 

比如父组件向子组件更新了一个state，子组件在用副作用监听且特殊处理（两次处理，state更新一次，effect里面再处理一次），如果有渲染开销，则可以避免闪烁之类的问题。[比较](https://zh-hans.react.dev/reference/react/useLayoutEffect#measuring-layout-before-the-browser-repaints-the-screen)

