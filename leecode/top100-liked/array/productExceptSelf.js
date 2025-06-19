/**
 * https://leetcode.cn/problems/product-of-array-except-self/solutions/1227232/si-lu-zhi-you-3bu-dai-ma-zhu-shi-xiang-x-xd5k/?envType=study-plan-v2&envId=top-100-liked
 * 1. 声明结果数组
 * 2. 从左向右遍历 存储当前元素左侧乘积
 * 3. 从右向左遍历 存储当前元素右侧乘积
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    const length = nums.length
    const target = new Array(length)
    target[0] = 1
    // 左 -> 右
    for (let i = 1; i < length; i++) {
        target[i] = nums[i - 1] * target[i - 1]
    }
    // 右 -> 左
    // 为右侧所有元素的乘积，刚开始右边没有元素
    let rightAll = 1;
    for (let i = length - 1; i >= 0; i--) {
        // 对于索引 i，左边的乘积为 res[i]，右边的乘积为 rightAll
        target[i] *= rightAll;
        rightAll *= nums[i];
    }
    console.log(target)
    return target;
};

productExceptSelf([1,2,3,4])