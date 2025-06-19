function pipeline(tasks = []) {
    return new Promise((resolve, reject) => {
        let chain = Promise.resolve()
        chain = chain.then(() => console.log('started'))
        tasks.forEach(task => chain = chain.then(() => task()))
        chain = chain.catch((err) => reject(err))
        chain = chain.finally(resolve)
    })
}

// 假设请求API为
function request(params) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(params), 1000);
    });
}  

/**
 * 预期，等1秒后输出1 2 3 ，再等一秒输出4 5
 * https://www.cnblogs.com/echolun/p/15906939.html
 */

class Scheduler1 {
    // 最多处理 maxCount 个请求的调度器
    constructor(maxCount) {
        this.maxCount = maxCount
        this.queue = []
        this.count = 0
    }
    add (param) {
        return new Promise((resolve, reject) => {
            this.queue.push({ param, resolve, reject })
            this.start()
        })
    }
    start() {
        // 保证 最多处理 maxCount 个请求的调度器
        if (!this.queue.length || this.count >= this.maxCount) return
        const { param: oldValue, resolve, reject } = this.queue.shift()
        this.count++
        request(oldValue)
        .then(resolve)
        .catch(reject)
        .finally(() => {
            this.count--
            this.start()
        })
    }
}

// const s = new Scheduler(3)
// s.add(1).then(console.log) // 1
// s.add(2).then(console.log) // 1
// s.add(3).then(console.log) // 1
// s.add(4).then(console.log) // 1
// s.add(5).then(console.log) // 1


/**
 * 保证运行的任务最多2个
 */
class Scheduler2 {
    constructor(maxCount = 2) {
        this.queue = []
        this.maxCount = maxCount
        this.count = 0
    }
    add(promiseCreator) {
        return new Promise((resolve, reject) => {
            this.queue.push(promiseCreator)
            this.start()
        })
    }
    addTask (time, order) {
        this.add(() => request(time).then(()=>console.log(order)))
    }
    start() {
        // 要同时执行2个
        if (!this.queue.length || this.count >= this.maxCount) return
        this.count++
        this.queue
            .shift()()
            .finally(() => {
                this.count--
                this.start()
            })
    }
}

// const s2 = new Scheduler2(2)
// s2.addTask(1000, '1');
// s2.addTask(500, '2');
// s2.addTask(300, '3');
// s2.addTask(400, '4');

/**
 * // 最多处理3个请求的调度器
function Scheduler(list=[], limit=3){
  // ...
};

Scheduler([1,2,3,4,5]).then(console.log); // 1 2 3 4 5
 */

function Scheduler(list = [], limit = 3) {
    let count = 0, resLength = 0;
    const pending = [...list], resList = [];
    return new Promise((resolve, reject) => {
        const runner = () => {
            if (!pending.length || count >= limit) return
            count++
            const index = list.length - pending.length
            const value = pending.shift()
            request(value)
            .then((res) => {
                console.log('用于验证限制器:', res);
                count--
                resLength++
                resList[index] = res
                resLength === list.length ? resolve(resList) : runner()
            })
            .catch(reject)
        }
        list.forEach(() => runner())
    })
}

Scheduler([1, 2, 3, 4, 5]).then(console.log);


function retry(fn, times, delay  = 100) {
    return new Promise((resolve, reject) => {
        function att() {
            fn().then(v => resolve(v)).catch((err) => {
                if (times--) {
                    setTimeout(att, delay)
                } else {
                    reject(err)
                }
            })
        }
        att()
    })
}