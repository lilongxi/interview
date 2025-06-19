/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 * https://leetcode.cn/problems/search-in-rotated-sorted-array/solutions/2232939/er-fen-cha-zhao-jsban-ben-by-silly-almei-tyub/?envType=study-plan-v2&envId=top-100-liked
 * 思路：
 * 1. 将局部有序的数组一分为二
 * 2. 左右两侧数组 总有一部分有序 一部分无序 需要找出有序部分
 * 
 */
var search = function(nums, target) {
    let left = 0, right = nums.length - 1
    while (left <= right) {
        const midd = (left + right) >> 1
        if (nums[midd] === target) return midd
        // 如果左侧小于中间的值 左侧有序
        if (nums[left] <= nums[midd]) {
            // 目标元素小了 向右侧增加
            if (target < nums[left] || target > nums[midd]) {
                left = midd + 1
            } else {
                right = midd - 1
            }
        } else {
            // 否则右侧有序
            if (target < nums[midd] || target > nums[right]) {
                right = midd -1
            } else {
                left = midd + 1
            }
        }
    }
    return -1
};