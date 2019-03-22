function addEvent(dom, eventName, handler, capture) {
    if(!eventName || !handler) {
        return
    }
    if(dom.addEventListener) {
        capture = capture ? capture : false
        dom.addEventListener(eventName, handler, capture)
    } else if (dom.addEvent) {
        dom.addEvent(eventName, handler)
    } else {
        dom[`on${eventName}`] = handler
    }
}
