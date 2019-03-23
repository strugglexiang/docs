// ---------------------------------- example
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


// ---------------------------------- example2
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
