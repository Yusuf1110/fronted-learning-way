### JSX 会让你把标签放到 JavaScript 中。而大括号{}会让你 “回到” JavaScript 中
例如：

    return (
        <h1 className="avatar">  //这里不解析，就是字符串
        {user.name}  //里面解析js
        </h1>
    );
### 更新见面，组件中声明一个 state 变量，[something, setSomething] 为它们命名。
例如：

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

### 当用对象作为state时,为了真正地触发一次重新渲染，需要创建一个新对象并把它传递给 state 的设置函数
将 state 视为只读的,React 并不知道对象已更改。所以 React 没有做出任何响应。虽然在一些情况下，直接修改 state 可能是有效的，但我们并不推荐这么做。你应该把在渲染过程中可以访问到的 state 视为只读的。
    const  [a,setA] = useState([])
    setA(a.push[1])//没效
    setA(a.slice().push[1])//有效

### 共享数据并一起更新，将子级的 state 上移到父级中
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

### 对 React 来说重要的是组件在 UI 树中的位置,而不是在 JSX 中的位置，如果有两个一样的组件在同一个地方渲染，那么会共享state，绑定key就可以独立。
指定一个 key 能够让 React 将 key 本身而非它们在父组件中的顺序作为位置的一部分。这就是为什么尽管你用 JSX 将组件渲染在相同位置，但在 React 看来它们是两个不同的计数器。因此它们永远都不会共享 state。每当一个计数器出现在屏幕上时，它的 state 会被创建出来。每当它被移除时，它的 state 就会被销毁。在它们之间切换会一次又一次地使它们的 state 重置。

### 让两个 Counter 各自独立的话，可以将它们渲染在不同的位置。

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
起初 isPlayerA 的值是 true。所以第一个位置包含了 Counter 的 state，而第二个位置是空的。
当你点击“下一位玩家”按钮时，第一个位置会被清空，而第二个位置现在包含了一个 Counter。
### 组件从 DOM 中移除时,它的 state 就会被销毁。

### 避免多级传递Props。可以将jsx作为子组件传递

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

### props 是不可变的，组件需要改变它的 props，它不得不“请求”它的父组件传递不同的 props
也就是子组件接受父组件的方法，然后调用方法，改变父组件的state，然后父组件重新渲染，子组件也会重新渲染。

### 声明 Effect，默认情况下，Effect 会在每次渲染后都会执行。具体渲染方式由第二个参数控制

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

### 你可以在 Effect 中返回一个函数，这个函数会在组件被卸载/渲染时执行
