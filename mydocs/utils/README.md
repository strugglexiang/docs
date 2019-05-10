[类型判断]:https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString#Using_toString()_to_detect_object_class
[offset]:https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetParent
[getBoundingClientRect]:https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect
[window.innerHeight]:https://developer.mozilla.org/en-US/docs/Web/API/Window/innerHeight
[window.getComputedStyle]:https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getComputedStyle


# 个人工具函数


## 类型判断
[类型判断][类型判断]   

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


## 元素在文档中位置
[offSet][offSet]

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


## 元素出现在视口内
[getBoundingClientRect][getBoundingClientRect]    
[window.innerHeight][window.innerHeight]   
[window.getComputedStyle][window.getComputedStyle]

```js
function eleInViewport(selector, fn) {
    let elements = [].slice.call(document.querySelectorAll(selector))
    elements.forEach((e, index) => {
        let condition1 = e.getBoundingClientRect().top <= window.innerHeight &&
                         e.getBoundingClientRect().bottom >= 0
        let condition2 = getComputedStyle(e).display !== "none"
        if (condition1 && condition2) {
            fn && fn(e)
        }
    })
}
```



## 防抖



## 节流