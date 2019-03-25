/**
 * 状态模式：对象的内部状态会使对象的行为发生改变，看起来就像改变了对象的类。
 * 实现关键：
 * 1. 环境类：内部维护各个状态，持有各个状态类对象的引用，以便将行为传递给具体的状态对象处理。
 * 2. 状态类：处理具体的行为，并持有环境类对象的引用，以便状态对象直接调用环境类对象(用来切换状态或者其他操作)。
 */

/**
 * 考虑以下场景
 * 台灯上有一个按钮，按第一下从关闭状态变为弱光状态，按第二下由弱光变为强光状态，按第三下由强光变为关闭状态
 */


//----------------------------------- 普通实现方式
/**
function light() {
    this.statu = 'close'
}
light.prototype.pressOn = function() {
    if(this.statu === 'close') {
        console.log('进入弱光状态')
        this.statu = 'week'
    } else if (this.statu === 'week') {
        console.log('进入强光状态')
        this.statu = 'strong'
    } else {
        console.log('进入关闭状态')
        this.statu = 'close'
    }
}

const light1 = new light()
light1.pressOn() //进入弱光状态
light1.pressOn() //进入强光状态
light1.pressOn() //进入关闭状态
light1.pressOn() //进入弱光状态
 */

/**
 * 上述写法的缺点
 * 1. 每增加或者修改状态都需要修改pressOn方法的代码，不符合封闭原则。
 * 2. 当状态足够多或者每种状态的处理很复杂时，会导致pressOn方法变成一个非常大方法，难以解读和维护。
 * 3. 如果状态足够多的时候，如果不阅读完整的代码，无法一幕了然的知道到底有多少种状态和该状态的下一个变化状态。
 * 4. 改动、增加状态有可能导致代码多处需要修改。
 */

//----------------------------------- 状态模式的实现方式
/*
//--- 环境类
function light(statu) {
    this.closeLight = new closeLight(this)
    this.weekLight = new weekLight(this)
    this.strongLight = new strongLight(this)

    this.statu = statu || this.closeLight
}

light.prototype.setStatu = function(statu) {
    this.statu = statu
}

light.prototype.pressOn = function() {
    this.statu.pressOn()
}

//----- 状态类
function closeLight(light) {
    this.light = light
}

function weekLight(light) {
    this.light = light
}

function strongLight(light) {
    this.light = light
}


//----- 每个状态类必须重写pressOn方法
function handler() {
}

handler.prototype.pressOn = function() {
    throw(new Error('必须重写pressOn方法'))
}

var abstract  = new handler()

closeLight.prototype = new handler()
weekLight.prototype = new handler()
strongLight.prototype = new handler()


//----- 具体处理方法
closeLight.prototype.pressOn = function() {
    console.log('进入弱光状态')
    this.light.setStatu(this.light.weekLight)
}


weekLight.prototype.pressOn = function() {
    console.log('进入强光状态')
    this.light.setStatu(this.light.strongLight)
}

strongLight.prototype.pressOn = function() {
    console.log('进入关闭状态')
    this.light.setStatu(this.light.closeLight)
}


const light1 = new light()
light1.pressOn() //进入弱光状态
light1.pressOn() //进入强光状态
light1.pressOn() //进入关闭状态
light1.pressOn() //进入弱光状态
 */


//----------------------------------- es6实现方式
class light {
    constructor(statu) {
        this.closeLight = new closeLight(this)
        this.weekLight = new weekLight(this)
        this.strongLight = new strongLight(this)

        this.statu = statu || this.closeLight
    }

    setStatu(statu) {
        this.statu = statu
    }

    pressOn() {
        this.statu.pressOn()
    }
}

class handler {
    pressOn() {
        throw new Error('必须重写pressOn方法')
    }
}

class closeLight extends handler {
    constructor(light) {
        super()
        this.light = light
    }
    pressOn() {
        console.log('进入弱光状态')
        this.light.setStatu(this.light.weekLight)        
    }
}

class weekLight extends handler {
    constructor(light) {
        super()
        this.light = light
    }
    pressOn() {
        console.log('进入强光状态')
        this.light.setStatu(this.light.strongLight)        
    }
}

class strongLight extends handler {
    constructor(light) {
        super()
        this.light = light
    }
    pressOn() {
        console.log('进入关闭状态')
        this.light.setStatu(this.light.closeLight)        
    }
}

const light1 = new light()
light1.pressOn() //进入弱光状态
light1.pressOn() //进入强光状态
light1.pressOn() //进入关闭状态
light1.pressOn() //进入弱光状态


/**
 * 状态模式优缺点
 * 优点：
 * 1. 通过封装状态类，能够方便的添加、切换状态。
 * 2. 避免context的无限膨胀。
 * 3. 解除状态间的耦合，每个状态处理自己的行为而不相互影响。
 * 4. 将当前的状态记录成一个对象，使状态切换变得一目了然。
 * 缺点：
 * 1. 会使代码结构变得复杂。
 * 2. 造成逻辑的分散，无法从一个地方快速读取到业务流程。
 */

// ---------------------------------- 简单使用示例example1
/*
const trafficLight = (
    () => {
        let currentLight = null
        //状态类
        return (light) => {
            currentLight = light
            currentLight()
        }
    }
)()

const redLight = () => {
    console.log('红灯停')
}


const greenLight = () => {
    console.log('绿灯行')
}


const yellowLight = () => {
    console.log('黄灯准备')
}


trafficLight(redLight)
trafficLight(yellowLight)
trafficLight(greenLight)
*/


// ---------------------------------- 简单实用示例example2
/*
const getResult = (function() {
    const state = {
        statu1() {
            console.log('状态1')
        },
        statu2() {
            console.log('状态2')
        },
        statu3() {
            console.log('状态3')
        },
        statu4() {
            console.log('状态4')
        }
    }
    const show = function(num) {
        state[`statu${num}`]()
    }

    return {
        show,
    }
})()

getResult.show(1)
getResult.show(2)
getResult.show(3)
getResult.show(4)
*/
