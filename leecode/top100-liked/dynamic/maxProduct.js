/**
 * @param {number[]} nums
 * @return {number}
 * 思路：最大乘积和最大子数组的区别在于 乘积存在 负负为证的情况 所以
 * 需要声明两个 dp table 一个用于计算最大值 一个用于计算最小值
 */
var maxProduct = function(nums) {
    const n = nums.length
    const dpMax = new Array(n), dpMin = new Array(n)
    // 初始化 base case
    dpMax[0] = dpMin[0] = nums[0]
    for (let i = 1; i < n; i++) {
        // 比较重要的一点是 计算最大和最小值的时候 都需要同时相乘
        dpMin[i] = Math.min(dpMax[i - 1] * nums[i], dpMin[i - 1] * nums[i], nums[i])
        dpMax[i] = Math.max(dpMax[i - 1] * nums[i], dpMin[i - 1] * nums[i], nums[i])
    }
    return Math.max(...dpMax)
};

console.log(maxProduct([2,3,-2,4]))