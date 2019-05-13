[scrollTop]: https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollTop
[1]: https://developer.mozilla.org/zh-CN/docs/Web/API/Window/scrollY


# scrollTop
[scrollTop][scrollTop]     
一个元素的 scrollTop 值是这个元素的顶部到视口可见内容（的顶部）的距离的度量。当一个元素的内容没有产生垂直方向的滚动条，那么它的 scrollTop 值为0。


# 滚动条位置
[MDN][1]      
```js
    const scrollTop = window.pageYOffset || 
                      document.documentElement.scrollTop || 
                      document.body.scrollTop
```


# 返回顶部
```js
document.querySelector('.top').addEventListener('click', function () {
    timer = setInterval(function () {
        //获取滚动条的滚动高度
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        //用于设置速度差，产生缓动的效果
        var speed = Math.floor(-scrollTop / 8)
        document.documentElement.scrollTop = document.body.scrollTop = scrollTop + speed
        isTop = true  //用于阻止滚动事件清除定时器
        if (scrollTop == 0) {
            clearInterval(timer)
        }
    }, 10)
})
```