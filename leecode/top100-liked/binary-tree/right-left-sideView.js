/**
 * 二叉树的 左右 视图
 * BSF：
 *  rightSide：每一层的最后一个节点
 *  leftSide： 每一层的第一个节点
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideBFSView = function(root) {
    const leftSide = [], rightSide = []
    const queue = []
    if (root) queue.push(root)
    while (queue.length) {
        const length = queue.length
        rightSide.push(queue[length - 1].val)
        leftSide.push(queue[0])
        // 依次获取列队中节点的 左右节点
        for (let i = 0; i < length; i++) {
            const currNode = queue.shift()
            if (currNode.left) queue.push(currNode.left)
            if (currNode.right) queue.push(currNode.right)
        }
    }
    return rightSide
};

var rightSideDFSView = function(root) {
    const rightSide = []
    const helper  = function(childRoot, depth)  {
        if (!childRoot) return
        // 每次遍历都记录深度 rightSide是0的时候是左侧节点 rightSide长度是最深的时候 右侧节点
        if (rightSide.length === depth) {
            rightSide.push(childRoot.val)
        }
        helper(childRoot.right, depth + 1)
        helper(childRoot.left, depth + 1)
    }
    helper(root, 0)
    return rightSide
}