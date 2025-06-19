// https://pan.baidu.com/pfile/video?path=/mksz562-%E4%B8%A4%E5%91%A8%E5%88%B7%E5%AE%8C100%E9%81%93%E5%89%8D%E7%AB%AF%E4%BC%98%E8%B4%A8%E9%9D%A2%E8%AF%95%E7%9C%9F%E9%A2%98[%E5%AE%8C%E7%BB%93]/%E7%AC%AC9%E7%AB%A0+%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%AF%95%E6%8A%80%E8%83%BD%E6%8B%BC%E5%9B%BE7+%EF%BC%9A%E5%88%86%E6%9E%90%E5%92%8C%E8%A7%A3%E5%86%B3%E9%97%AE%E9%A2%98%E7%9A%84%E6%80%9D%E8%B7%AF+-+%E5%8F%AF%E4%BB%A5%E7%8B%AC%E7%AB%8B%E8%A7%A3%E5%86%B3%E9%97%AE%E9%A2%98/9-5+-%E6%8A%8A%E4%B8%80%E4%B8%AA%E6%95%B0%E7%BB%84%E8%BD%AC%E6%8D%A2%E4%B8%BA%E6%A0%91%E3%80%90%E6%B5%B7%E9%87%8F%E8%B5%84%E6%BA%90%EF%BC%9Aubkz.com%E3%80%91_ev.mp4

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
    const idToTreeNode = new Map()
    let root = null
    arr.forEach(item => {
        const { id, name, parentId } = item
        const treeNode = { id, name }
        idToTreeNode.set(id, treeNode)
        const parentNode = idToTreeNode.get(parentId)
        if (parentNode) {
            if (parentNode.children == null) {
                parentNode.children = []
            }
            parentNode.children.push(treeNode)
        }
        if (parentId == 0) root = treeNode
    })
    return root
}

/**
 * 注意数组顺序，决定需要广度优先还是深度优先
 * @param {*} root 
 */
function convert2Arr(root) {
    const nodeToParent = new Map()
    const arr = []
    const queue = []
    queue.unshift(root)
    while (queue.length) {
        // 这个元素即父节点
        const rr = queue.pop()
        if (!rr) break
        const { id, name, children = [] } = rr
        // 不过父节点也有可能是某个节点的子节点
        const parentNode = nodeToParent.get(rr)
        // 是不是跟节点
        const parentId = parentNode?.id || 0
        // 生成节点对象
        const item = { id, name, parentId }
        arr.push(item)
        // 处理子节点
        if (children.length) {
            children.forEach(item => {
                nodeToParent.set(item, rr)
                queue.unshift(item)
            })
        }
    }
    return arr
}

console.log(convert2Arr(convert(arr)))