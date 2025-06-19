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
 * @return {void} Do not return anything, modify root in-place instead.
 * 1. 深度优先遍历
 * 2. 生成链表
 */
var flatten = function(root) {
    const result = []
    const helperDFS = function(root) {
        if (!root) return
        result.push(root.val)
        helperDFS(root.left)
        helperDFS(root.right)
    }
    helperDFS(root)
    let head = new TreeNode('-1')
    while (result.length) {
        const h = result.shift()
        head.right = new TreeNode(h.val, null)
        head = head.right
    }
    return head.right
};

