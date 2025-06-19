/**
 * 事件总线
 */

class EventEmiiter {
    constructor() {
        this.events = {}
    }

    on (type, runner, once = false) {
        const events = this.events
        if (events[type] == null) events[type] = []
        events[type].push({ runner, once })
    }

    once (type, runner) {
        this.on(type, runner, true)
    }

    off (type, runner) {
        const events = this.events
        if (!runner) {
            events[type].length = 0
        } else {
            events[type] = events[type].filter(i => i.runner !== runner)
        }
    }

    emit (type, ...args) {
        const events = this.events
        const runners = events[type]
        if (!runners) return
        events[type] = runners.filter(item => {
            const {runner, once } = item
            runner(...args)
            // 直接过滤掉执行一次的函数
            return !once
        })
    }

}