let callbacks = []
let pending = false
let uid = 0

let has = {};
let queue = [];
let waiting = false;

function nextTick(cb) {
    callbacks.push(cb)
    if (!pending) {
        pending = true
        setTimeout(flushCallbacks, 0)
    }
}

function flushCallbacks() {
    pending = false
    const copies = callbacks.slice(0)
    callbacks.length = 0
    for (let i = 0; i < copies.length; i++) {
        copies[i]();
    }
}


class Watcher {
    constructor() {
        this.id = ++uid
    }
    update() {
        console.log('watch' + this.id + ' update');
        queueWatcher(this)
    }
    run() {
        console.log('watch' + this.id + '视图更新啦～');
    }
}

function queueWatcher(watcher) {
    const id = watcher.id
    if (has[id] == null) {
        has[id] = true;
        queue.push(watcher);
        if (!waiting) {
            waiting = true;
            nextTick(flushSchedulerQueue);
        }
    }
}

// 批量更新 watcher
function flushSchedulerQueue () {
    let watcher, id;
    for (index = 0; index < queue.length; index++) {
        watcher = queue[index];
        id = watcher.id;
        has[id] = null;
        watcher.run();
    }
    waiting  = false;
}