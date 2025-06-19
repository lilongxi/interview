/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 * https://leetcode.cn/problems/search-insert-position/?envType=study-plan-v2&envId=top-100-liked
 * 考点：找到目标值 如果没有就 【按顺序返回】 二分左边界
 */

var searchInsert = function(nums, target) {
    let left = 0, right = nums.length - 1
    while (left <= right) {
        const midd = Math.floor((left + right) / 2)
        if (nums[midd] === target) {
            right = midd - 1
        } else if (nums[midd] > target) {
            right = midd - 1
        } else if (nums[midd] < target) {
            left = midd + 1
        }
    }
    return left
};