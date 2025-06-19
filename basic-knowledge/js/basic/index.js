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
    const id2Tree = new Map()
    let root;
    arr.forEach(treeNode => {
        const { id, name, parentId } = treeNode
        const newTreeNode = { id, name, children: [] }
        if (parentId == 0) root = newTreeNode
        id2Tree.set(id, newTreeNode)
        const parentNode = id2Tree.get(parentId)
        if (parentNode) {
            parentNode.children.push(newTreeNode)
        }
    })
    console.log(JSON.stringify(root))
    return root
}

class S {
    constructor(maxCount = 3) {
        this.maxCount = maxCount
        this.count = 0
        this.queue = []
    }
    add (promiseCreator) {
        return new Promise((resolve, reject) => {
            this.queue.push({ promiseCreator, resolve, reject })
            this.start()
        })
    }
    start() {
        if (!this.queue.length || this.count >= this.maxCount) return
        const { promiseCreator, resolve, reject } = this.queue.shift()
        this.count++
        promiseCreator()
        .then(resolve)
        .catch(reject)
        .finally(() => {
            this.count--
            this.start()
        })
    }
}

//  通过 广度优先 遍历 DOM 节点
function breathFirstTraverse(root) {
    const q = []
    q.unshift(root)
    while (root) {
        const curr = q.pop()
        if (!curr || !curr.childNodes || !curr.childNodes.length) break
        console.log(curr.tagName)
        curr.childNodes.forEach((n) => {
            q.unshift(n)
        })
    }
}

function depthFirstTraverse(root) {
    const stack = []
    stack.push(root)
    while (stack.length) {
        const curr = stack.pop()
        if (!curr || !curr.childNodes || !curr.childNodes.length) break
        const nodes = curr.childNodes;
        [...nodes].reverse().forEach((n) => {
            stack.push(n)
        })
    }
}

console.log(convert(arr))

const parseParam = function(url) {
    // null
    const paramsStr = /.+\?(.+)$/.exec(url)[1]
    const paramsArr = paramsStr.split('&')
    const paramsObj = {}
    paramsArr.forEach((param) => {
        if (/=/.test(param)) {
            let [k, v] = param.split('=')
            v = decodeURIComponent(v)
            v = /^+d+$/.test(v) ? parseFloat(v) : v
            if (Object.prototype.hasOwnProperty.call(paramsObj, k)) {
                paramsObj[k] = [].concat(paramsObj[k], v);
            } else {
                paramsObj[k] = v
            }
        } else {
            paramsObj[param] = true
        }
    })
    return paramsObj
}
