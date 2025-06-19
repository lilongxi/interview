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
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function(root, targetSum) {
    const helper = function(rt, s) {
        if (!rt) return false
        s -= rt.val
        // base case 
        if (!rt.left && !rt.right) return s === 0
        return helper(rt.left, s) || helper(rt.right, s)
    }
    return !root ? false : helper(root, targetSum)
};