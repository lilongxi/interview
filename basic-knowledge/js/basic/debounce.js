
// https://github.com/mqyqingfeng/Blog/issues/22
// 最后一次触发的 N秒 后执行 间隔时间由用户决定
function debounce(cb, delay = 200, immediate) {
    let timer = 0, result
    return function() {
        if (timer) clearTimeout(timer)
        if (immediate) {
            const callNow = !timer
            timer = setTimeout(() => timer = null, delay)
            if (callNow) result = cb.apply(this, arguments)
        } else {
            timer = setTimeout(() => {
                cb.apply(this, arguments)
                timer = 0
            }, delay)
        }
    }
}

function throttle2(cb, delay = 200) {
    let timer = 0
    return function() {
        if (timer) return
        timer = setTimeout(() => {
            cb.apply(this, arguments)
            timer = 0
        }, delay)
    }
}

// 多个事件被合并成一个 不过会固定间隔的时间
// https://github.com/mqyqingfeng/Blog/issues/26
function throttle(cb, delay = 100, trailing = true) {
    let _start = Date.now(), timer = 0
    return function() {
        const _now = Date.now()
        const cacheThis = this
        if (timer) clearTimeout(timer)
        if (_now - _start > delay || trailing) {
            cb.apply(cacheThis, arguments)
            _start = Date.now()
            trailing = false
        } else {
            timer = setTimeout(cb.bind(cacheThis, arguments), delay)
        }
    }
}
