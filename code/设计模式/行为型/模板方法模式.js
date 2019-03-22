// ------------ es5
/*
function people() {}

function step1() {
    console.log('用水清洗')
}

function step2() {
    console.log('去掉不能吃的部分')
}

function step3() {
    console.log('放入盘中')
}


function step4() {
    console.log('开吃')
}

function hook() {
    return true
}

people.prototype = {
    step1: step1,
    step2: step2,
    step3: step3,
    step4: step4,
    hook: hook,
    eatFruit: function() {
        this.step1()
        this.step2()
        this.step3()
        if(this.hook()) {
            this.step4()
        }
    }
}

function foolish() {}

foolish.prototype = new people()

foolish.prototype.step1 = function() {
    console.log('用油清洗')
}


foolish.prototype.step2 = function() {
    console.log('专门留下不能吃的部分')
}


foolish.prototype.hook = function() {
    return false
}
*/

//---------------------------------- es6
class people {
    step1() {
        console.log('用水清洗')
    }
    step2() {
        console.log('去掉不能吃的部分')
    }
    step3() {
        console.log('放入盘中')
    }
    step4() {
        console.log('开吃')
    }
    hook() {
        return true
    }
    eatFruit() {
        this.step1()
        this.step2()
        this.step3()
        if(this.hook()) {
            this.step4()
        }
    }
}

class foolish extends people {
    step1() {
        console.log('用油清洗')
    }
    step2() {
        console.log('专门留下不能吃的部分')
    } 
    hook() {
        return false
    }   
}



//---------------------------------- 使用方法
const foolish1 = new foolish()
foolish1.eatFruit()