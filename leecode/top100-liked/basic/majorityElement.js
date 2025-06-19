/**
 * @param {number[]} nums
 * @return {number}
 * 
 * 块排 / hashtable
 * 
 * 思路：在一个有序数组中 如果一个数字出现的频率大于 length/2 ，那么 length/2 的位置就是这个数字
 * 
 */
var majorityElement = function(nums) {
    // logn
    nums = nums.sort((a, b) => a - b)
    return nums[Math.floor(nums.length / 2)]
};