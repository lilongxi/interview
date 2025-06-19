/**
 * @param {number[]} nums
 * @return {number}
 * https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array/?envType=study-plan-v2&envId=top-100-liked
 * 
 * 思路：排除递增区间 比如
 * 
 */
var findMin = function(nums) {
    let left = 0, right = nums.length - 1
    while (left <= right) {
        // base =case 找到最小元素
        if (nums[left] <= nums[right]) return nums[left]
        const midd = (left + right) >> 1
        // 这里就是递增区间
        if (nums[left] <= nums[midd]) {
            left = midd + 1
        } else {
            // 否则最小值在右边 不需要缩小右区间
            right = midd
        }
    }
    return -1
};