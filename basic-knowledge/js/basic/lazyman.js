/**
 * lazyMan('xxx').sleep(1000).eat('333').sleepFirst(2000)
 * sleepFirst 最先执行
 * rxjs https://segmentfault.com/a/1190000017842510
 */

class lazyMan {

    constructor(name) {
        this.task = []
        this.task.push(() => {
            return new Promise((reslove) => {
                console.log('name: ' + name)
                reslove()
            })
        })
    }

    // 异步变同步
    run () {
        let sq = Promise.resolve()
        for(const fn of this.task) {
            sq = sq.then(() => fn())
        }
    }

    eat (str) {
        this.task.push(() => {
            return new Promise((reslove) => {
                console.log('eat: ' + str)
                reslove()
            })
        })
        return this
    }

    sleep (time) {
        this.task.push(() => {
            return new Promise((reslove) => {
                setTimeout(() => {
                    console.log('Wake up after ' + time)
                    reslove()
                }, time)
            })
        })
    }

    sleepFirst (time) {
        this.task.unshift(() => {
            return new Promise((reslove) => {
                setTimeout(() => {
                    console.log('sleepFirst up after ' + time)
                    reslove()
                }, time)
            })
        })
    }
}