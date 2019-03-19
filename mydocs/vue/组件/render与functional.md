# render与functional
这一节是`vue`使用中较为高级的内容，我希望读者能够结合[官网说明](https://cn.vuejs.org/v2/guide/render-function.html#%E5%9F%BA%E7%A1%80)一起阅读。

`Vue`在性能上最大的优化就是引入了`Virtual DOM`，即**虚拟DOM**。虚拟DOM是`javascript`中的对象，它对**真实DOM**进行了描述并对**真实DOM**的变化保持追踪。由于它是`js`驱动，它能以极小的代价计算出真实DOM需要变化的地方并对其做最小的改动。对于开发人员来说，这种改动是自发的，开发人员只需关注数据的变化，能够有更多的时间思考业务逻辑。

`VDOM`大概是下面这种形式：
```js
const VDOM = {
    tag: 'div',
    context: VueComponent,
    data: {
        id: 'app'
    },
    children: [
        {
            tag: undefined,
            text: 'Hello World!'
        }
    ],
    ...
}
```

一般来说，我们将组件的模板写在`template`标签中，但是它不是最终的展现形式，它只是一种对开发者友好的语法。在编译阶段，`template`里面的内容将会被编译成`render`函数。我们来比较下`template`和`render`写法:
```vue
<template>
    <div id='app' class='test'>
        Hello World!
    </div>
</template>    
```

```vue
<script>
export default {
    render(createElement) {
        return createElement(
            'div',
            {
                class: {
                    test: true,
                },
                attrs: {
                    id: 'app'
                }
            }, 
            [
                'Hello World!'
            ]
        )
    }
}
<script>
```
`render`函数提供了`createElement`方法，将`createElement`的执行结果做为返回值。`createElement`返回值大概如下：
```js
{
    tag: 'div',
    context: VueComponent,
    data: {
        id: 'app'
    },
    children: [
        {
            tag: undefined,
            text: 'Hello World!'
        }
    ],
    ...
}
```
我们将`createElement`创建出的`js对象`称为`VNode（虚拟节点）`。而**虚拟DOM**就是我们对`vue`组件树建立起来的`VNode`树的称呼。即`VDOM`是众多`VNode`节点构成的树的总称。

当组件的状态发生变化时，会重新触发`render`函数创造出新的`VNode`节点，新旧节点通过`diff`算法进行对比，生成补丁对象。最后遍历补丁对象，对真实DOM进行更新。


## render
一般情况下，我们使用`template`就做够应付大部分的应用场景，我们也推荐`template`写法，这也是`Vue`相对`React`的一大优势(React中无template写法)。`render`写法一般只应用于以下场景：
- vue版本不支持解析`template`模板，上节中有过介绍。
- 使用两个相同的slot。
- 组件的内容需要父组件自由传递，slot不能解决问题，需要发挥`javascript`的完全编程能力。

`render`的写法相对于`template`是有难度的。要写好一个`render`函数，只需写好`createElement(简写为h)`中的三个参数：

1. 要渲染的元素，可以是标签或者组件选项，该参数为必填项。
```js
//------ 1. 标签
h('div')
//------ 2. 组件选项
import myCompo from './myCompo'
h(myCompo)
```

2. 组件的配置对象，可选。包括组件的id、style、class、指令、事件、slot、props等。这部分比较复杂，也是render写法的难点所在。但是不用全部完整记住，只需在用到某一特性时参考[官网用法](https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5-data-%E5%AF%B9%E8%B1%A1)
```js
h('div', {
    //---- 和v-class用法一样
    class: {
        test: true,
    },
    //---- 和v-style用法一样
    style: {
        color: 'red',
    },
    //--- 普通的html属性
    attrs: {
        id: 'app',
    },
    //--- 组件props
    props: {
        myProp: 'something',
    },
    //--- DOM属性props
    domProps: {
        innerHTML: 'Hellow world'
    },
    //---- 事件
    on: {
        click: this.handelClick,
    },
    //----- 原生事件
    nativeOn: {
        click: this.handelClick,
    },   
    // 如果组件是其他组件的子组件，需为插槽指定名称
    slot: 'name-of-slot',
    ...,
})
```

3. 子节点，可选, String 或 Array。它同样是个VNode.
```js
//-- String
h('div', 'Hello world')
//-- Vnode
h('div', [
    h('span', 'hello world')
])
```

其中`v-if`和`v-for`指令需要在render中用`if和for`语句拆分书写。

::: warning 注意
VNode在VDOM中要保持唯一性
也就是说，下面的写法是错的
```js
render(h) {
    let a = h('span', 'ni')
    return h('div', [
        a,
        a
    ])
}

render(h) {
    return h('div', [
        this.$slots.default,
        this.$slots.default
    ])
}
```

对于循环渲染多个组件和元素，可以用工厂函数解决
```js
render(h) {
    const children = Array.apply(null, {
        length: 5
    }).map(v => {
        return h('span', 'ni')
    })
    return h('div', children)
}
```

对于需要渲染多个slot, 需要将slot的每个子节点进行克隆。即对slot的每个子节点进行`createElement`操作，需要写一个递归函数，这里十分复杂，是作者的知识盲区，日后会实践补充。



:::

https://github.com/vuejs/jsx#installation
https://cn.vuejs.org/v2/guide/render-function.html#%E7%BA%A6%E6%9D%9F













