# 有用的链接
[TypeScript 入门教程](https://ts.xcatliu.com/)

[Runoob](https://www.runoob.com/typescript/ts-tutorial.html)

[TypeScript Handbook（中文版）](https://zhongsp.gitbooks.io/typescript-handbook/content/)

### JavaScript 的内部工作原理更接近于动态类型的解释性语言。TypeScript 是完全兼容 JavaScript 的，它不会修改 JavaScript 运行时的特性，所以它们都是弱类型。

JavaScript 是一种解释性语言，而不是编译性语言。诸如C++或Java之类的程序在运行之前需要进行编译。源代码通过称为编译器的程序传递，编译器将其转换为机器理解并可以执行的字节码。相比之下，JavaScript 没有编译步骤。相反，浏览器中的解释器会读取 JavaScript 代码，解释每一行并运行它。更现代的浏览器使用一种称为即时 (JIT) 编译的技术，该技术在 JavaScript 即将运行时将其编译为可执行字节码。


### TypeScript 只会在编译时对类型进行静态检查，如果发现有错误，编译的时候就会报错。而在运行时，与普通的 JavaScript 文件一样，不会对类型进行检查。

### undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 number 类型的变量

### 变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型：any。

```typescript
let something;
something = 'seven';
something = 7;
```
### 如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型。