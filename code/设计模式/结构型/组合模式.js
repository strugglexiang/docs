/**
 * 组合模式：将对象组合成树形结构表示‘部分-整体’的层次结构。
 * 组合模式使得用户对组合对象和普通对象的访问保持一致性。用户可以像处理简单元素一样来处理复杂元素，解除了客户端与复杂结构之间的耦合。
 * 使用者不需要知道当前对象是组合对象还是普通对象，不需要写一堆if/else来分别处理他们。组合对象和普通对象会各自做自己正确的事情。
 */


/**
 * 适用场景：
 * 1. 表示对象的‘部分-整体’结构。能够很方便的构造出一颗对象树并对其节点进行设置。
 * 2. 客户端对组合对象和普通对象的使用具有一致性。
 */


/**
 * 案例：文件系统。一个文件夹的子元素可以是文件夹，也可以是文件，子文件夹的子元素也可能是文件或文件夹。
 * 不论是文件夹还是文件，用户都可以对其进行删除、复制等操作。
 */


/**
 * 一遍构成部分： 
 * 1. 抽象对象(Compoent)：为了保持行为的一致性，定义参与组合的对象的公共接口。 
 * 2. 基本对象(Leaf)：整个树形结构中最根本的对象，是最基础的组成元素，它不能被组成。
 * 3. 组合对象(Composite)：由基本对象或组合对象构成对象。
 */


//---------------------------------------- 文件系统示例
/**
//----- 抽象类
var Component = function() {
    
}

//---- 定义公共方法
Component.prototype.add = function() {
    throw new Error('该方法必须被重写')
}

Component.prototype.delete = function() {
    throw new Error('该方法必须被重写')
}

Component.prototype.copy = function() {
    throw new Error('该方法必须被重写')
}

//----- 定义file类(文件类)
var file = function(name) {
    this.name = name
    this.parent = null
}

file.prototype = new Component()

file.prototype.setParent = function(parent) {
    this.parent = parent
}

file.prototype.add = function() {
    throw new Error('根节点不能添加文件')
}

file.prototype.copy = function() {
    console.log('文件' + this.name + '已被复制')
}


file.prototype.remove = function() {
    var files = this.parent && this.parent.children
    if(!files || !files[0]) {
        return
    }
    for(var i =0; i < files.length; i++) {
        if(files[i] === this) {
            files.splice(i, 1)
        }
    }
}



//----- 定义folder类(文件夹类)
var floder = function(name) {
    this.name = name
    this.children = []
}

floder.prototype = new Component()

floder.prototype.add = function(file) {
    file.parent = this
    this.children.push(file)
}


floder.prototype.copy = function() {
    for(var i = 0; i < this.children.length; i++) {
        this.children[i].copy()
    }
    console.log('文件夹' + this.name + '已被复制')
}

floder.prototype.remove = function() {
    var files = this.parent && this.parent.children
    if(!files || !files[0]) {
        return
    }
    for(var i =0; i < files.length; i++) {
        if(files[i] === this) {
            files.splice(i, 1)
        }
    }
}

//---------------------------- 生成元素
var file1= new file('javascript')
var file2 = new file('music')
var file3 = new file('test')

var floder1 = new floder('floder1')
var floder2 = new floder('floder2')

var floder3 = new floder('floder3')

//--------------------------- 组合成树
floder1.add(file1)
floder2.add(file2)
floder3.add(floder1)
floder3.add(floder2)
floder3.add(file3)

floder3.copy()
floder2.remove()
file1.remove()
 */

//-------------------------------------------------- es6重写案例
class Composite {
    add() {
        throw new Error('add方法必须被重写')
    }
    copy() {
        throw new Error('copy方法必须被重写')
    }
    remove() {
        throw new Error('remove方法必须被重写')
    }
}

class file extends Composite {
    constructor(name) {
        super()
        this.name = name
        this.parent = null
    }
    setParent(parent) {
        this.parent = parent
    }
    add() {
        throw new Error('根节点不能添加')
    }
    copy() {
        console.log('文件' + this.name + '已被复制')
    }
    remove() {
        let files = this.parent.children
        if(!files || !files[0]) {
            return 
        }
        this.parent.children = files.filter((item) => {
            return item !== this
        })
    }
}


class floder extends Composite {
    constructor(name) {
        super()
        this.name = name
        this.children = []
    }
    add(file) {
        this.children.push(file)
        file.parent = this
    }
    copy() {
        this.children.forEach(v => {
            v.copy()
        })
        console.log(`文件夹${this.name}已被复制`)
    }
    remove() {
        let files = this.parent.children
        if(!files || !files[0]) {
            return 
        }
        this.parent.children = files.filter((item) => {
            return item !== this
        })
    }
}
//---------------------------- 生成元素
const file1 = new file('javascript')
const file2 = new file('music')
const file3 = new file('test')

const floder1 = new floder('floder1')
const floder2 = new floder('floder2')

const floder3 = new floder('floder3')

//---------------------------- 组合
floder1.add(file1)
floder2.add(file2)
floder3.add(floder1)
floder3.add(floder2)
floder3.add(file3)

floder3.copy()
floder2.remove()
file1.remove()




 