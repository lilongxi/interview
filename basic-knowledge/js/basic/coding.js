
/**
 * DOM 节点遍历 区分 DFS 和 BFS
 * 扩展：树的左右视图
 */

/**
 *  数组转树
 */
const arr = [
    { id: 1, name: '1', parentId: 0 },
    { id: 2, name: '2', parentId: 1 },
    { id: 3, name: '3', parentId: 1 },
    { id: 4, name: '4', parentId: 2 },
    { id: 5, name: '5', parentId: 2 },
    { id: 6, name: '6', parentId: 3 },
    { id: 7, name: '7', parentId: 3 },
]

function convert(arr = []) {
    const id2TreeNode = new Map()
    let root = null;
    for (let i = 0; i < arr.length; i++) {
        const treeNode = arr[i];
        const { id, parentId, name } = treeNode;
        const newTreeNode = { id, name }
        if (!parentId) root = newTreeNode;
        id2TreeNode.set(id, newTreeNode)
        const parentNode = id2TreeNode.get(parentId)
        if (parentNode) {
            if (!parentNode.children) parentNode.children = []
            parentNode.children.push(newTreeNode)
        }
    }
    return root
}

function convert2Arr(root) {
    const treeNode2id = new Map()
    const queue = [], arr = []
    queue.push(root)
    while (queue.length) {
        const node = queue.shift()
        if (!node) break
        const { id, name, children = [] } = node
        const parentNode = treeNode2id.get(node)
        const parentId = !parentNode ? 0 : parentNode.id
        const newTreeNode = { id, name, parentId }
        arr.push(newTreeNode)
        if (children.length) {
            children.forEach((childNode) => {
                treeNode2id.set(childNode, node)
                queue.push(childNode)
            })
        }
    }
    return arr
}

// console.log(convert2Arr(convert(arr)))

Function.prototype.myCall = function(context, ...args) {
    context = context || globalThis
    // 重要的一点
    if (typeof context === 'object') context = new Object(context)
    const myCall = Symbol.for('myCall')
    context[myCall] = this
    const result = context[myCall](...args)
    delete context[myCall]
    return result
}

Function.prototype.myBind = function(context, ...bindArgs) {
    const cacheThis = this
    return function (...args) {
        const newArgs = bindArgs.concat(args)
        return cacheThis.myCall(context, ...newArgs)
    }
}

function compose(middlewares = []) {
    return function (context, next) {
        let index = -1
        function dispatch(idx) {
            if (idx <= index) {}
            index = idx
            const middleware = middlewares[idx] || next
        }
        dispatch(0)
    }
}

function debounce(fn, delay = 200) {
    let timer
    return function() {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.call(this, ...arguments)
            timer = 0
        }, delay)
    }
}

function throttle(fn, delay = 200) {
    let _start = Date.now()
    return function () {
        let _end = Date.now()
        if (_end - _start < delay)  return
        fn.call(this, ...arguments)
        _start = Date.now()
    }
}

const Dep = new WeakMap

function cloneDeep(object) {
    
    if (typeof object !== 'object' || object == null) {
        // symbol regex Date
        return object
    }

    const obj2Map = Dep.get(object)
    if (obj2Map) return obj2Map

    let target = {}
    Dep.set(object, target)

    if (object instanceof Map) {
        target = new Map
        object.forEach((v, k) => {
            const v1 = cloneDeep(v)
            const k1 = cloneDeep(k)
            target.set(k1, v1)
        })
    }

    if (object instanceof Set) {
        target = new Set
        object.forEach(v => target.add(cloneDeep(v)))
    }

    if (object instanceof Array) {
        target = object.map((i) => cloneDeep(i))
    }

    for (const k in object) {
        target[k] = cloneDeep(object[k])
    }

    return target

}

const r = /\[(\d+)\]/g
function lodashGet(s, path, defaulValue = undefined) {
    let result = s
    const paths = path.replace(/\[(\d+)\]/g, '.$1')
    for (const path of paths) {
        result = Object(result)[path]
        if (result == null) return defaulValue
    }
    return result
}

// * lazyMan('xxx').sleep(1000).eat('333').sleepFirst(2000)
class LazyMan {

    constructor(name) {
        this.q = []
        this.eat(name)
    }

    sleep(time) {
        this.q.push(() => {
            return new Promise((resolve) => {
                console.log('Wake up after ' + time)
                setTimeout(resolve, time)
            })
        })
        return this
    }

    sleepFirst(time) {
        this.q.unshift(() => {
            return new Promise((resolve) => {
                console.log('sleepFirst up after ' + time)
                setTimeout(resolve, time)
            })
        })
        return this
    }

    eat(s) {
        this.q.push(() => {
            return new Promise((resolve) => {
                console.log(s)
                resolve()
            })
        })
        return this
    }

    start() {
        let sq = Promise.resolve()
        for (const q of this.q) {
            sq = sq.then(() => q())
        }
        return this
    }

}

const lazyMan = new LazyMan('leelongxi')

lazyMan.sleep(1000).eat('333').sleepFirst(2000).start()

class Scheduler {
    constructor(maxCount) {
        this.maxCount = maxCount
        this.count = 0
        this.q = []
    }

    // 必须是一个函数且返回 Promise
    add (promiseCreator) {
        return new Promise((resolve, reject) => {
            this.q.push({ promiseCreator, resolve, reject })
            this.start()
        })
    }

    addtask(args) {
        // this.add()
    }

    start() {
        if (!this.q.length || this.count >= this.maxCount) return
        this.count++
        const { promiseCreator, resolve, reject } = this.q.shift()
        promiseCreator()
            .then(resolve)
            .catch(reject)
            .finally(() => {
                this.count--
                this.start()
            })
    }
}

/**
 * 
 * @param {*} url 
 * 1. 匹配 ？
 * 2. 匹配 &
 */
const r2 = /.+\?(.+)$/g
function parseParam(url) {
    const paramsStr = /.+\?(.+)$/g.exec(url)[1]
    const paramsArr = paramsStr.split('&')
    const paramsObj = {}
    paramsArr.forEach((param) => {
        if (/=/.test(param)) {
            let [k, v] = param.split('=')
            k = decodeURIComponent(k)
            v = /^\d+$/.test(v) ? parseFloat(v) : v
            if (paramsObj.hasOwnProperty(k)) {
                paramsObj[k] = [].concat(paramsObj[k], v)
            } else {
                paramsObj[k] = v
            }
        } else {
            paramsObj[param] = true
        }
    })
    return paramsObj
}

function curry(cb) {
    const target = []
    const length = cb.length
    return function deep(...args) {
        // 拼接参数
        target.concat(...args)
        if (target.length < length) return deep
        return cb.apply(this, target.slice(0, length))
    }
}


const breathFirstTraverse = function(root) {
    const q = []
    q.push(root)
    while (q.length) {
        const length = q.length
        for (let i = 0; i < length; i++) {
            const curNode = q.shift()
            if (curNode.children.length) {
                [...curNode.children].forEach(x => q.push(x))
            }
        }
    }
}

const objectCreate = function(obj) {
    function factory() {}
    factory.prototype = obj
    return new factory
}