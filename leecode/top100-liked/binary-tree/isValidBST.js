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
 * @return {boolean}
 * https://leetcode.cn/problems/validate-binary-search-tree/?envType=study-plan-v2&envId=top-100-liked
 * 搜索二叉树：左子树小于当前节点，右子树大于当前节点
 */
var isValidBST = function(root) {
    const helper = function(root, low, high) {
        if (!root) return true
        if (root.val <= low || root.val >= high) return false
        return helper(root.left, low, root.val) && helper(root.right, root.val, high)
    }
    return helper(root, -Infinity, Infinity)
};