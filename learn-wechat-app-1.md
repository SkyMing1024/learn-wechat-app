## 视图层-WXML

WXML是在xml基础上设计标签语言，与HTML类似。

主要功能：

* 数据绑定
* [列表渲染](#列表渲染)
* [条件渲染](#条件渲染)
* 模板
* 事件
* 引用

#### 1.数据绑定

wxml页面上的动态数据都来自对应页面的Page的data；只需要用Mustache语法（双大括号）将变量包起来；

**注意：**false或true等关键字需要用双括号转成对应类型，否则将解析成字符串

```
<checkbox checked="{{false}}"> </checkbox> //false有效，checkbox未选中状态
<checkbox checked="false"> </checkbox>     //被解析字符串"false",checkbox选中状态
```



##### 列表渲染

* 在组件上使用 `wx:for` 控制属性绑定一个数组，即可使用数组中各项的数据重复渲染该组件。 默认数组的当前项的下标变量名默认为 `index`，数组当前项的变量名默认为 `item` 

* 使用 `wx:for-item` 可以指定数组当前元素的变量名;

* 使用 `wx:for-index` 可以指定数组当前下标的变量名;

  **注意：**

  * 当 `wx:for` 的值为字符串时，会将字符串解析成字符串数组 

    ```javascript
    <view wx:for="array">
      {{item}}
    </view>
    ```

    等同于

    ```javascript
    <view wx:for="{{['a','r','r','a','y']}}">
      {{item}}
    </view>
    ```

  * 花括号与引号之间如果空格，将解析成字符串

    ```javascript
    <view wx:for="{{[1,2,3]}} ">
    ```
    等同于
    ```javascript
    <view wx:for="{{[1,2,3]+' '}} ">
    ```

###### 条件渲染

* wx:if

    使用 `wx:if="{{condition}}"` 来判断是否需要渲染该代码块，与常用的if-else 语句一样，`wx:if`控制属性也有对应的`wx:elif`和`wx:else`控制属性 	：

    ```javascript
    <view wx:if="{{length > 5}}"> 1 </view>
    <view wx:elif="{{length > 2}}"> 2 </view>
    <view wx:else> 3 </view>
    ```

* block wx: if

    如果需要将根据同一个条件判断多个组件标签，可以用一个</block>将多个组件标签包装起来，并用wx:if控制属性

    ```javascript
    <block wx:if="{{true}}">
      <view> view1 </view>
      <view> view2 </view>
    </block>
    ```

    **注意：** `<block/>` 并不是一个组件，它仅仅是一个包装元素，不会在页面中做任何渲染，只接受控制属性。 

* df 

 