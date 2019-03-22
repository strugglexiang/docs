function basketball() {
    this.name = '篮球'
}
basketball.prototype.rule = function() {
    console.log('篮球比赛需要10个人')
}

function football() {
    this.name = '足球'
}
football.prototype.rule = function() {
    console.log('足球需要足球场')
}


function pingPong() {
    this.name = '乒乓球'
}
pingPong.prototype.rule = function() {
    console.log('乒乓球只需两人对战')
}



function ball(name) {
    switch(name) {
        case 'basketball':
            return new basketball()
        case 'football':
            return new football()
        case 'pingPong':
            return  new pingPong() 
        default: 
            return new Object()         
    }
}