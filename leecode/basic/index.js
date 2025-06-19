/**
 * 线性遍历
 */

function traverse(arr) {
    for (let i = 0; i < arr.length; i++) {}
}

class ListNode {
    constructor(val) {
        this.val = val
        this.next = null
    }
}

/**
 * traverse depth
 */
function depthTraverse(head) {
    for (let p = head; p != null; p = p.next) {
        console.log(p)
    }
}

class TreeNode {
    constructor(val) {
        this.val = val
        this.left = null
        this.right = null
    }
}

// 二叉树
function treeTraverse(root) {
    if (!root) return
    // 前序位置
    treeTraverse(root.left)
    // 中序位置
    treeTraverse(root.right)
    // 后续位置
}

// N叉树
function treeTraverseN(root) {
    if (!root) return
    for (var i = 0; i < root.children.length; i++) {
        traverse(root.children[i]);
      }
}

function codeNumber(numbers = [], partNum = 100) {
    if (!numbers.length) return []
    let left = 0, right = numbers.length
    const result = [];
    partNum = Math.min(partNum, numbers.length)
    while (left < right) {
        const parts = numbers.slice(left, left + partNum)
        let endIdx = 0
        while (endIdx < partNum) {
            const num = parts[endIdx]
            const newNum = num ? (endIdx < partNum - 1 ? num + (endIdx + 1) : num) : null
            if (newNum) result.push(newNum)
            endIdx++
        }
        left += partNum
    }
    // console.log(result)
    return result
}

codeNumber(['ab', 'c', 'd', 'ab', 'c'])


function compareVersion(compares = []) {
    const vMap = {}
    let maxLength = 0
    return compares
    .map((v) => {
        const char = v.replace(/\./g, '')
        maxLength = Math.max(maxLength, char.length)
        return char
    })
    .map((i, idx) => {
        let v = (maxLength - i.length)
        let c = 1
        while (v--) c *= 10
        const newValue = (+i) * c
        vMap[newValue] = compares[idx]
        return newValue
    })
    .sort((a, b) => b - a)
    .reduce((prev, curr) => {
        const oldV = vMap[curr]
        prev.push(oldV)
        return prev
    }, [])
}

console.log(compareVersion(['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5', '5.4.3.2.1.0', '0.0.0.0.0.0.0.1']))