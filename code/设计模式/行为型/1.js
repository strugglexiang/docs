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
    function publish(eventName, ...args) {
        msg[eventName].map(handler => {
            console.log(this)
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

const handler1 = () => {
    console.log('handler1接收到消息')
}
const handler2 = () => {
    console.log('handler2接收到消息')
}

const handler3 = () => {
    console.log('handler3接收到消息')
}

observer1.register('test', handler1)
observer1.register('test', handler2)
observer1.register('test', handler3)

observer1.publish('test', 1, 2)
