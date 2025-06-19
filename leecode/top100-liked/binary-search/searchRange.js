/**
 * https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/?envType=study-plan-v2&envId=top-100-liked
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 * 考点：二分左边界 + 二分右边界
 */


var left_bound = function(nums, target) {
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
    if (left >= nums.length || nums[left] !== target) return -1
    return left
}

const right_bound = function(nums, target) {
    let left = 0, right = nums.length - 1
    while (left <= right) {
        let midd = Math.floor((left + right) / 2)
        // 当找右侧边界的时候 因为要找最右侧 扩大左区间
        if (nums[midd] === target) {
            left = midd + 1
        } else if (nums[midd] > target) {
            right = midd - 1
        } else if (nums[midd] < target) {
            left = midd + 1
        }
    }
    if (right < 0 || nums[right] !== target) return -1
    return right
}

var searchRange = function(nums, target) {
    return [
        left_bound(nums, target),
        right_bound(nums, target)
    ]
};