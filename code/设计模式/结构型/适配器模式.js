/**
 * 适配器模式：通过将一个类的接口转换成一个新的客户端期待的接口，使得因接口不兼容的类能够在一起工作。
 */


/**
 * 实现关键：
 * 1. 将被适配的类或对象封装成一个新的所期待的形式，也就是创建适配器。
 * 2. 结合当前类和适配器，提供一个统一的调用方法供外使用。
 */

/**
 * 使用场景：
 * 1. 确实需要将不兼容的第三方适配成统一的用法，使得他们能够一起工作。
 * 2. ‘亡羊补牢’式做法，旧的接口复杂且能够正常运行但是与新的接口使用方式不兼容。
 */


//--------------------------------- 下面是一个普通的实例
//现有一个渲染方法showMap，当它接收到的是百度地图则渲染百度地图，接收高德地图则渲染高德地图
/*
//--- 百度地图的渲染方法
const baiduMap = {
    show() {
        console.log('开始渲染百度地图')
    }
}

const gaodeMap = {
    show() {
        console.log('开始渲染高德地图')
    }
}

const showMap = function(map) {
    if(map.show) {
        map.show()
    }
}

showMap(baiduMap) //开始渲染百度地图
showMap(gaodeMap) //开始渲染高德地图
*/


/**
 * 但是上事实上不是所有的第三方都是兼容的，如果百度地图的渲染方法是render呢
 * 这个时候就可以创建一个适配器来适配百度地图，使之能够在showMap方法里能够正常使用
 */
/*
const baiduMap = {
    render() {
        console.log('开始渲染百度地图')
    }
}

const gaodeMap = {
    show() {
        console.log('开始渲染高德地图')
    }
}

const showMap = function(map) {
    if(map.show) {
        map.show()
    }
}

//---- 百度地图适配器
const baiduAdapter = {
    show() {
        return baiduMap.render()
    }
}


//---- 使用
showMap(baiduAdapter)  //开始渲染百度地图
showMap(gaodeMap) //开始渲染高德地图
 */

//------------------------------------------ 类适配器
//类适配器的关键是 它继承于要被适配的类

/**
//---- 百度地图类
function baiduMap() {

}

baiduMap.prototype.render = function() {
    console.log('开始渲染百度地图')
}

//---- 高德地图类
function gaodeMap() {

}

gaodeMap.prototype.show = function() {
    console.log('开始渲染高德地图')
}

//------- 创建适配器类
function baiduAdapter() {

}

baiduAdapter.prototype =  new baiduMap()

baiduAdapter.prototype.show = function() {
    return this.render()
}


//-------- 使用
function showMap(map) {
    if(map.show) {
        return map.show()
    }
}

showMap(new baiduAdapter()) //开始渲染百度地图
 
showMap(new gaodeMap()) //开始渲染高德地图

 */


//------ es6
/**
class baiduMap {
    render() {
        console.log('开始渲染百度地图')
    }
}

class gaodeMap {
    show() {
        console.log('开始渲染高德地图')
    }
}

class baiduAdapter extends  baiduMap {
    show() {
        return this.render()
    }
}
//-------- 使用
function showMap(map) {
    if(map.show) {
        return map.show()
    }
}

showMap(new baiduAdapter()) //开始渲染百度地图
 
showMap(new gaodeMap()) //开始渲染高德地图

 */



//---------------------------------------------- 对象适配器
// 关键在于 它持有要被适配的类的实例

/**
//---- 百度地图类
function baiduMap() {

}

baiduMap.prototype.render = function() {
    console.log('开始渲染百度地图')
}

//---- 高德地图类
function gaodeMap() {

}

gaodeMap.prototype.show = function() {
    console.log('开始渲染高德地图')
}


//------- 创建适配器类
function baiduAdapter(target) {
    this.target = target
}

baiduAdapter.prototype.show = function() {
    return this.target.render()
}


//-------- 使用
function showMap(map) {
    if(map.show) {
        return map.show()
    }
}

showMap(new baiduAdapter(new baiduMap()))//开始渲染百度地图
showMap(new gaodeMap()) //开始渲染高德地图
 */



 //------- es6
class baiduMap {
    render() {
        console.log('开始渲染百度地图')
    }
}

class gaodeMap {
    show() {
        console.log('开始渲染高德地图')
    }
}

class baiduAdapter {
    constructor(map) {
        this.target = map
    }
    show() {
        return this.target.render()
    }
}

//-------- 使用
function showMap(map) {
    if(map.show) {
        return map.show()
    }
}

showMap(new baiduAdapter(new baiduMap()))//开始渲染百度地图
showMap(new gaodeMap()) //开始渲染高德地图




