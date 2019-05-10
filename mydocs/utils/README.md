# 说明
书写总结个人的工具函数

[类型判断]:https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString#Using_toString()_to_detect_object_class
[offset]:https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetParent


#  类型判断
[MDN参考][类型判断]
```js
function getBaseType(e) {
    return Object.prototype.toString.apply(e).slice(8, -1)
}
```
可能的取值：
* Number
* String
* Boolean
* Null
* Undefined
* Object
* Array
* Symbol


# 元素在文档中位置
[MDN参考][offSet]
```js
function getPosition(e) {
    const position = {
        left: 0,
        top: 0
    }
    if(!e.tagName) {
        return new Error('element must be a HTML element object')
    }
    position.left = e.offsetLeft
    position.top = e.offsetTop
    let offsetParent = e.offsetParent
    while(offsetParent) {
        position.left += offsetParent.offsetLeft
        position.top += offsetParent.offsetTop
        offsetParent = offsetParent.offsetParent
    }
    return position
}

```
::: tip 注意
使用`offsetLeft`、`offsetTop`不能检测到css中`transform`的偏移
:::