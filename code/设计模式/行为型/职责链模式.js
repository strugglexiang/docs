/**
 * 概念
 * 职责链模式：解决了请求者和接受者之间的耦合。多个接收者对象通过每个接收者对下一个接收者引用构成了一个处理请求的链条，每个接收者
 * 都是这个链条上的处理节点。请求在这个链条中一直传递，直到某个接收者处理请求。每个接收者都有机会处理请求。
 */

/**
 * 实现要点：
 * 1. 封装一个节点类，维护当前处理对象以及下一个处理对象。
 * 2. 利用节点类将处理对象封装成节点。
 * 3. 将节点连接起来构成链。
 */

/**
 * 使用方式：
 * 向链的第一个节点发送请求。
 */

/**
 * 优点：
 * 1. 请求发送者只需知道第一个处理的节点，从而解除了请求者和多个接收者之间的强联系。
 * 2. 能够自由的操控链条上的节点。
 */

/**
 * 缺点：
 * 1. 一个请求发送后，很多节点只是起到一个传递的作用，并没有实质性的意义，链条过长会有性能损耗。
 * 2. 请求发送后，可能到最后没有接受者能够处理。这里的解决方案是在链条的底部添加一个保底的解决节点。
 */


/**
 * 有以下业务场景
 * 某次营销活动下订单可以预定，交500元订金的用户最后下订单时可获得200元优惠卷，交300元预定金的用户可获得100元优惠卷，
 * 没有预定用户则以正常价格购买。
 */

/**
 * 请求参数说明：
 * 1. payType: 用户类型 1(交付500元订金的用户) 2(交付300元订金的用户) 3(正常购买的用户)
 * 2. ifpay: 预定金是否已经支付。若未支付则按正常价格购买。
 * 3. stock: 库存。
 */

//  ------------------------------------ 基础实现
/*
function proOrder(payType, ifpay, stock) {
    if(payType === 1) {
        if(ifpay) {
            console.log('获得200元优惠卷')
        } else {
            if(stock < 0) {
                console.log('库存不足')
            } else {
                console.log('需以正价价格购买')
            }
        }
    }

    if(payType === 2) {
        if(ifpay) {
            console.log('获得100元优惠卷')
        } else {
            if(stock < 0) {
                console.log('库存不足')
            } else {
                console.log('需以正价价格购买')
            }
        }
    }

    if(payType === 3) {
        if(stock <= 0) {
            console.log('库存不足')
        } else {
            console.log('需以正价价格购买')
        }
    }
    
}
proOrder(1, true, 100)  //获得200元优惠卷
proOrder(1, false, 20)  //需以正价价格购买
proOrder(2, true, 2)    //获得100元优惠卷
proOrder(2, false, 10)  //需以正价价格购买
proOrder(3, false, 0)   //库存不足
proOrder(3, false, 10)  //需以正价价格购买
 */

/**
 * 上述代码写法，虽然功能能够正常使用，但维护起来无疑是个梦魇。
 */


//-------------------------------------  初次优化调整
/**
function order500(payType, ifpay, stock) {
    if(payType === 1 && ifpay) {
        console.log('获得200元优惠卷')
    } else {
        order300(payType, ifpay, stock)
    }
}

function order300(payType, ifpay, stock) {
    if(payType === 2 && ifpay) {
        console.log('获得100元优惠卷')
    } else {
        orderNormal(payType, ifpay, stock)
    }
}


function orderNormal(payType, ifpay, stock) {
    if(stock <= 0) {
        console.log('库存不足')
    } else {
        console.log('需以正常价格购买')
    }
}

order500(1, true, 100)  //获得200元优惠卷
order500(1, false, 20)  //需以正价价格购买
order500(2, true, 2)    //获得100元优惠卷
order500(2, false, 10)  //需以正价价格购买
order500(3, false, 0)   //库存不足
order500(3, false, 10)  //需以正价价格购买
 */


/**
 * 上述代码虽然实现了接收者间的解耦，但是如果需要修改下一个处理节点则需要在原有代码里面修改，不符合封闭原则
 */

// -------------------------------------------------- 职责链模式
//----  节点类
function chain(fn) {
    this.fn = fn //当前处理对象
    this.nextHandler = null// 下一个处理对象
}

chain.prototype.setNextHandler = function(fn) {
    this.nextHandler = fn
}

chain.prototype.perFormQuequest = function() {
    let res = this.fn.apply(this, arguments)
    if(res === 'nextHandler') {
        return this.nextHandler && this.nextHandler.perFormQuequest.apply(this.nextHandler, arguments)
    }
    return res
}


//------ 具体的处理对象
function order500(payType, ifpay, stock) {
    if(payType === 1 && ifpay) {
        console.log('获得200元优惠卷')
    } else {
        return 'nextHandler'
    }
}

function order300(payType, ifpay, stock) {
    if(payType === 2 && ifpay) {
        console.log('获得100元优惠卷')
    } else {
        return 'nextHandler'
    }
}


function orderNormal(payType, ifpay, stock) {
    if(stock <= 0) {
        console.log('库存不足')
        return
    }
    console.log('以正常价格购买')
}

//------ 处理对象封装成链节点
// let nodeOrder500 = new chain(order500)
// let nodeOrder300 = new chain(order300)
// let nodeOrderNormal = new chain(orderNormal)

//----- 构成链
// nodeOrder500.setNextHandler(nodeOrder300)
// nodeOrder300.setNextHandler(nodeOrderNormal)
// nodeOrder500.perFormQuequest(1, true, 100)  //获得200元优惠卷
// nodeOrder500.perFormQuequest(1, false, 20)  //需以正价价格购买
// nodeOrder500.perFormQuequest(2, true, 2)    //获得100元优惠卷
// nodeOrder500.perFormQuequest(2, false, 10)  //需以正价价格购买
// nodeOrder500.perFormQuequest(3, false, 0)   //库存不足
// nodeOrder500.perFormQuequest(3, false, 10)  //需以正价价格购买


//----- 解除order300节点
// nodeOrder500.setNextHandler(nodeOrderNormal)
// nodeOrder500.perFormQuequest(1, true, 100)  //获得200元优惠卷
// nodeOrder500.perFormQuequest(1, false, 20)  //需以正价价格购买
// nodeOrder500.perFormQuequest(2, true, 2)    //需以正价价格购买
// nodeOrder500.perFormQuequest(2, false, 10)  //需以正价价格购买
// nodeOrder500.perFormQuequest(3, false, 0)   //库存不足
// nodeOrder500.perFormQuequest(3, false, 10)  //需以正价价格购买



/**
 * 如果需要解除order300的节点
 * let nodeOrder500 = new chain(order300)
 * let nodeOrder300 = new chain(orderNormal)
 */

//-------------------------------------------- 异步职责链
/*
chain.prototype.next = function() {
    this.nextHandler && this.nextHandler.perFormQuequest.apply(this.nextHandler, arguments)
}


let nodeOrder500 = new chain(order500)
let nodeOrder300 = new chain(function(payType, ifpay, stock) {
    setTimeout(() => {
        if(payType === 2 && ifpay) {
            console.log('获得100元优惠卷')
        } else {
            this.next(...arguments)
        }          
    }, 2000)    
})
let nodeOrderNormal = new chain(orderNormal)

nodeOrder500.setNextHandler(nodeOrder300)
nodeOrder300.setNextHandler(nodeOrderNormal)

nodeOrder500.perFormQuequest(1, true, 100)  //获得200元优惠卷
nodeOrder500.perFormQuequest(1, false, 20)  //需以正价价格购买  等待2s
nodeOrder500.perFormQuequest(2, true, 2)    //需以正价价格购买  等待2s
nodeOrder500.perFormQuequest(2, false, 10)  //需以正价价格购买  等待2s 
nodeOrder500.perFormQuequest(3, false, 0)   //库存不足 等待2s
nodeOrder500.perFormQuequest(3, false, 10)  //需以正价价格购买 等待2s
 */




//---------------------------------------------------- 更为简化的链接方式
//------ 处理对象
function a(count) {
    if(count === 1) {
        console.log('a处理')
    } else {
        return 'nextHandler'
    }
}

function b(count) {
    if(count === 2) {
        console.log('b处理')
    } else {
        return 'nextHandler'
    }
}

function c(count) {
    if(count === 3) {
        console.log('c处理')
    } else {
        return 'nextHandler'
    }
}

function noHanler(count) {
    console.log('无法处理')
}

Function.prototype.after = function(fn) {
    let self = this
    return function() {
        let res = self.apply(this, arguments)
        if(res === 'nextHandler') {
            return  fn && fn.apply(this, arguments)
        }
        return res
    }
}

let chain1 = a.after(b).after(c).after(noHanler)

