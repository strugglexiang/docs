//-------------------------------- 观察者模式
const proObserver = () => {
    const msg = {}
    //-------- 订阅
    const register = (eventName, handler) => {
        if(msg[eventName]) {
            msg[eventName].push(handler)
        }else {
            msg[eventName] = [handler]
        }
    }
    //-------- 发布
    const publish = function (eventName, ...args) {
        msg[eventName].map(handler => {
            handler.call(this, ...args)
        })
    }

    //-------- 退订
    const remove = (eventName, handler) => {
        msg[eventName] = msg[eventName].filter(v => (v !== handler))
    }

    //--------
    return {
        register,
        publish,
        remove
    }
}

//-------------- 使用
const observer1 = proObserver()

const handler1 = function() {
    console.log('handler1接收到消息')
    console.log(this, arguments)
}
const handler2 = function() {
    console.log('handler2接收到消息')
    console.log(this, arguments)
}

const handler3 = function(){
    console.log('handler3接收到消息')
    console.log(this, arguments)
}

observer1.register('test', handler1)
observer1.register('test', handler2)
observer1.register('test', handler3)

observer1.publish('test', 1, 2)
