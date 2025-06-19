/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 * 
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 * 将有序数组转换为二叉搜索树: 一道经典的二分 + 树的题目
 */
var sortedArrayToBST = function(nums) {
    const helper = function(nums, start, end) {
        if (start > end) return null
        const midd = (start + end) >> 1
        const middValue = nums[midd]
        const treeNode = new TreeNode(middValue)
        const left = helper(nums, start, midd - 1)
        const right = helper(nums, midd + 1, end)
        treeNode.left = left
        treeNode.right = right
        return treeNode
    }
    helper(nums, 0 , nums.length - 1)
};