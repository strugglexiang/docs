[classList]: https://developer.mozilla.org/zh-CN/docs/Web/API/Element/classList

# 参考
[classList][classList]


# 概念
**classList**: dom元素的只读属性，返回该元素的类列表(类名的类数组对象)

::: tip 场景
长久以来，操作`dom`元素的类名比较方便的方法是基于`jQquery`的`addClass`、`removeClass`、`toggleClass`，
但是现在原生的方法也能方便的进行这些操作了
:::

# 方法
虽然`classList`只是一个可读属性，但是它提供了6个相关的方法访问  

**add( String [, String] )**     
添加指定的类值。如果这些类已经存在于元素的属性中，那么它们将被忽略。

**remove( String [,String] )**
删除指定的类值。

**toggle ( String [, force] )**  
当只有一个参数时：切换 class value; 即如果类存在，则删除它并返回false，如果不存在，则添加它并返回true。

当存在第二个参数时：如果第二个参数的计算结果为true，则添加指定的类值，如果计算结果为false，则删除它
```js
div.classList.toggle("visible", i < 10 )
```

**item ( Number )** 
按集合中的索引返回类值。

**contains( String )** 
检查元素的类属性中是否存在指定的类值。

**replace( oldClass, newClass )** 
用一个新类替换已有类。