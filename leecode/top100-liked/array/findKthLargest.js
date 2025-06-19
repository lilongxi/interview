/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 * https://leetcode.cn/problems/kth-largest-element-in-an-array/?envType=study-plan-v2&envId=top-100-liked
 * 排序：快速排序
 */

const QuickSort = function(nums) {
    if (nums.length <= 1) return nums
    const midd = Math.floor(nums.length / 2)
    const middValue = nums.splice(midd, 1)[0]
    const left = [], right = []
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] < middValue) {
            left.push(nums[i])
        } else {
            right.push(nums[i])
        }
    }
    return QuickSort(left).concat(middValue, ...QuickSort(right))
}

var findKthLargest = function(nums, k) {
    const sorts = QuickSort(nums)
    return sorts[sorts.length - k]
};

console.log(findKthLargest([3,2,3,1,2,4,5,5,6], 4))