/**
 * https://leetcode.cn/problems/binary-tree-level-order-traversal/?envType=study-plan-v2&envId=top-100-liked
 * 二叉树的层遍历：BFS
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
 * @return {number[][]}
 */
var levelOrder = function(root) {
   const result = []
   if (!root) return result
   const q = []
   q.push(root)
   while (q.length) {
    const level = []
    const length = q.length
    // childNodes
    for (let i = 0; i < length; i++) {
        const curr = q.shift()
        level.push(curr.val)
        if (curr.left) q.push(curr.left)
        if (curr.right) q.push(curr.right)
    }
    result.push(level)
   }
   return result
};