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
 * @return {number}
 * 最大直径 = 左侧最大深度 + 右侧最大深度
 */
var diameterOfBinaryTree = function(root) {
    let maxDiameter = 0
    const maxDepth = function(root) {
        if (!root) return 0
        const leftMaxDepth = maxDepth(root.left)
        const rightMaxDepth = maxDepth(root.right)
        maxDiameter = Math.max(maxDiameter, leftMaxDepth + rightMaxDepth)
        const depth = Math.max(leftMaxDepth, rightMaxDepth) + 1
        return depth
    }
    maxDepth(root)
    return maxDiameter
};