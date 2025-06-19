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
 * @param {number} k
 * @return {number}
 * https://leetcode.cn/problems/kth-smallest-element-in-a-bst/?envType=study-plan-v2&envId=top-100-liked
 * 
 * 这里一定是搜索二叉：使用中序遍历 先左子树 再右子树 结束后就是一个 升序数组
 */
var kthSmallest = function(root, k) {
    const result = []
    const helper = function(root2) {
        if (!root2) return
        helper(root2.left)
        result.push(root2.val)
        helper(root2.right)
    }
    helper(root)
    return result[k - 1]
};