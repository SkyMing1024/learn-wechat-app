## 视图层-WXS

### 1.模块
每一个 .wxs 文件和 <wxs> 标签都是一个单独的模块。
每个模块都有自己独立的作用域。即在一个模块里面定义的变量与函数，默认为私有的，对其他模块不可见。
一个模块要想对外暴露其内部的私有变量与函数，只能通过 module.exports 实现。

### 2.wxs文件
.wxs 文件可以被其他的 .wxs 文件 或 WXML 中的 <wxs> 标签引用。
```JavaScript
// /pages/tools.wxs

var foo = "'hello world' from tools.wxs";
var bar = function (d) {
  return d;
}
module.exports = {
  FOO: foo,
  bar: bar,
};
module.exports.msg = "some msg";
```
### 3.module对象
每个wxs模块都有一个内置的module对象
属性：
* exports:通过该属性对外共享本模块的私有变量与函数
```JavaScript
<!-- page/index/index.wxml -->

<wxs src="./../tools.wxs" module="tools" />
<view> {{tools.msg}} </view>
<view> {{tools.bar(tools.FOO)}} </view>
```
### 4.require函数
用来在wxs文件中引用其他模块
注意：
* 只能引用 .wxs 文件模块，且必须使用相对路径。
* wxs 模块均为单例，wxs 模块在第一次被引用时，会自动初始化为单例对象。多个页面，多个地方，多次引用，使用的都是同一个 wxs 模块对象。
* 如果一个 wxs 模块在定义之后，一直没有被引用，则该模块不会被解析与运行

### 5.`<wxs>`标签
`<wxs src="./../logic.wxs" module="logic" />`
`<wxs src="./../logic.wxs" module="logic" ></wxs>`
* src属性
    * 引用 .wxs 文件的**相对路径**。仅当本标签为单闭合标签或标签的内容为空时有效。
* module属性
    * 表示<wxs>标签的模块名

### 6.变量
### 7.变量名
### 8.保留关键字
### 9.注释
```JavaScript
<!-- wxml -->
<wxs module="sample">
// 方法一：单行注释

/*
方法二：多行注释
*/

/*
方法三：结尾注释。即从 /* 开始往后的所有 WXS 代码均被注释

</wxs>
```