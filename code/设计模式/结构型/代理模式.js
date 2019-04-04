/**
 * 代理模式：当客户端不方便直接访问一个对象时，可以提供一个该对象的代理对象充当中介，这个代理对象能够对该对象进行访问。
 */

/**
 * 作用：
 * 1. 充当中介的作用。
 * 2. 也可以作为充当一层拦截，使得外界对该对象的访问，都必须先通过这层拦截。
 */

/**
 * 两部分组成：
 * 1. 真实对象：真正被访问的对象。
 * 2. 代理对象：能够对真实对象进行访问的对象。
 */

//-------------------------------------- 例1
/**
 * Tom给Mary对象送花
 */

/**
const Tom = {
    sendFlowers(target) {
        target.receiveFlowers()
    }
}

const Mary = {
    receiveFlowers() {
        console.log('Mary收到花')
    }
}

Tom.sendFlowers(Mary)
 */


/**
 * 但是Tom不是十分了解Mary，他想委托另一个了解Mary的人Bob， 让Bob在Marry心情好的时候代表他赠送。
 */

/**
const Tom = {
    sendFlowers(target) {
        target.receiveFlowers()
    }
}

const Mary = {
    receiveFlowers() {
        console.log('Mary收到花')
    }
}


const Bob = {
    sendFlowers(sender, receiver) {
        sender.sendFlowers(receiver)
    }
}

Bob.sendFlowers(Tom, Mary)

 */

//------------------------------------- 例2
/**
 * 图片懒加载
 * 图片在加载过程中显示预留的加载图片loading.gif
 */

/**
const lazyLoad = (function() {
    const realImg = document.createElement('img')
    //-----
    const loadImg = new Image()
    loadImg.onload = function() {
        realImg.src = this.src
    }
    //-----
    document.body.appendChild(realImg)

    return {
        setSrc(src) {
            realImg.src = '../../assert/loading.gif'
            loadImg.src = src
        }
    }
})()
lazyLoad.setSrc('https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2329667634,3759844774&fm=26&gp=0.jpg') 
 */


/**
 * 上述代码
 * lazyLoad对象有两个职责
 * 1. 设置懒加载的src
 * 2. 设置真实的src
 * 两个功能是耦合在一起的，不符合单一职责原则
 * 下面用代理模式将职责分离，实现图片加载的功能扩展
 */

/**
//---- 真实对象
const imgLoad = (function() {
    let img = document.createElement('img')
    document.body.appendChild(img)
    return {
        setSrc(src) {
            img.src = src
        }
    }
})()

//----- 代理对象
const lazyLoad = (function() {
    let img = new Image
    img.onload = function() {
        imgLoad.setSrc(this.src)
    }
    return {
        setSrc(src) {
            imgLoad.setSrc('../../assert/loading.gif')
            img.src = src
        }
    }
})()

lazyLoad.setSrc('https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2329667634,3759844774&fm=26&gp=0.jpg')
 */



//---------------------------------------------------- es6 Proxy
/**
 * es增加了新的特性Proxy
 * 在访问目标对象前，必须先通过一层拦截
 */


/**
 * Proxy 支持的拦截操作共有13种
 * 下面代码是基础使用
 */

//--------------------------------- get
/**
 * get: 拦截对象属性的读取
 * 接收3个参数，依次为目标对象、属性名、Proxy实例本身(严格上，操作行为所针对的对象)
 */

//------------- 基础使用
/**
const proxy1 = new Proxy({}, {
    get(target, property, receiver) {
        if(property === 'foo') {
            return 'foo'
        }
        return target[property]
    }
})

console.log(proxy1.foo) // foo
console.log(proxy1.a) // undefined
 */


//------------- 函数链式调用
/**
 * get方法返回值为函数实现函数的链式调用
 */

/**
const chainProxy = (function() {
    return function(value) {
        const chain = []
        const handler = {
            get(target, property, receiver) {
                if(property === 'get') {
                    return chain.reduce((value, fn) => {
                        return fn(value)
                    }, value)
                }         
                chain.push(window[property])   
                return receiver
            }
        }
        return new Proxy({}, handler)
    }
}())

function double(value) {
    return value * 2
}

function pow(value) {
    return value * value
}  

function reverse(value) {
    return value.toString().split('').reverse().join('') || 0
}

let result = chainProxy(5).pow.double.reverse.get 
console.log(result)//5*5*2后颠倒  结果05
 */

//--------- 数组负序号
/**
const arrayProxy = (function() {
    return function(array = []) {
        return new Proxy(array, {
            get(target, property, receiver) {
                let index = Number(property)
                if(index < 0) {
                    return target[index +  target.length]
                }
                return target[index]
            }
        })
    }
}())

const a = arrayProxy([1, 2, 3])
console.log(a[-1]) //3
console.log(a[-2]) //2
console.log(a[-3]) //1 
 */



//--------------------------------- set
/**
 * set: set方法拦截某个属性的赋值操作
 * 它依次接收4个参数：目标对象、属性、值、Proxy本身(实际上，原始行为所针对的对象)
 */

//----------- 例: 用作赋值验证
/**
const valiProxy = new Proxy({}, {
    set(target, property, value, receiver) {
        if(!Number.isInteger(value)) {
            throw new TypeError('the value is not an Inteter')
        }
        target[property] = value
    }
})
valiProxy.a = '123' //Uncaught TypeError: the value is not an Inteter 
 */


//----------- 例: 第4个参数一般指向Proxy本身
/*
const proxy = new Proxy({}, {
    set(target, property, value, receiver) {
        target[property] = receiver
    }
})

proxy.foo = 'a' 
console.log(proxy === proxy.foo) //true
 */

//---------- 例: 第四个参数指向操作对象本身
/**
const proxy = new Proxy({}, {
    set(target, property, value, receiver) {
        target[property] = receiver
    }
})

const obj = {}

Object.setPrototypeOf(obj, proxy)

obj.foo = 'a'
console.log(obj.foo === obj) //true 
 */

//---------- 例： 严格模式下set必须返回true
/**
'use strict'
const proxy = new Proxy({}, {
    set(target, propety, value, receiver) {
        target[propety] = value
    }
})

proxy.foo = 'a'//set' on proxy: trap returned falsish for property 'foo' 
 */



//--------------------------------- apply
/**
 * apply: apply操作拦截函数调用，call、apply操作
 * 依次接收3个参数：目标对象、目标对象上下文(this)、目标对象的参数数组
 */

//----------- 例1 函数拦截
/**
function func() {
    console.log('I am func')
}

const proxyFunc = new Proxy(func, {
    apply(target, ctx, args) {
        console.log('I am Proxy')
    }
})

func()// I am func
proxyFunc(1, 2) //I am Proxy 
*/


//---------- 例 apply、call拦截
/**
function sum(a, b) {
    return a + b
}

const proxySum = new Proxy(sum, {
    apply(target, ctx, args) {
        console.log('拦截')
    }
})

sum(1, 2) //3 
proxySum(1, 2)// 拦截
proxySum.call(null, 1, 2) //拦截
proxySum.apply(null, [3, 4]) //拦截 
Reflect.apply(proxySum, null, [3,4])//拦截
 
*/


//---------- 例 主动调用
/**
function sum(a, b) {
    return a + b
}

const proxySum = new Proxy(sum, {
    apply(target, ctx, args) {
       return Reflect.apply(...arguments)
    }
})

console.log(proxySum(1, 2))//3

console.log(proxySum(3, 4))//7
 */












