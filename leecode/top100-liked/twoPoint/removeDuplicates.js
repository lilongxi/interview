/**
 * https://leetcode.cn/problems/remove-duplicates-from-sorted-array/
 * @param {number[]} nums
 * @return {number}
 * 核心思路： slow 只要和 fast 不一样就变成 fast 最后 slow 变化了几次就代表有几个重复元素, 前提是 数组必须是 有序的
 */
var removeDuplicates = function(nums) {
    let slow = 0, fast = 0
    while (fast < nums.length) {
        if (nums[fast] !== nums[slow]) {
            slow++
            nums[slow] = nums[fast]
        }
        fast++
    }
    return slow + 1
};