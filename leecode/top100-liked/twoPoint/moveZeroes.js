
/**
 * https://leetcode.cn/problems/move-zeroes/?envType=study-plan-v2&envId=top-100-liked
 * @param {*} nums 
 * @returns 
 * 思路：巧用移除0的方式 
 */

var moveZeroes = function(nums = []) {
    if (nums.length <= 1) return nums
    let left = 0, right = nums.length, point = 0
    while (left < right) {
        // 考点：因为要原地变化 不等于0就向前挪动 等于 是0就往后挪动
        if (nums[left] !== 0) {
            [nums[left], nums[point]] = [nums[point], nums[left]]
            point++
        }
        left++
    }
    return nums
};


const removeElement = function(nums, val) {
    let slow = 0, fast = 0
    while (fast < nums.length) {
        if (val !== nums[fast]) {
            nums[slow++] = nums[fast]
        }
        fast++
    }
    return slow
}

const moveZeroes2 = function(nums) {
    // 找到所有非0 后的最后一个索引
    let p = removeElement(nums, 0)
    while (p < nums.length) {
        nums[p++] = 0
    }
    return nums
}

console.log(moveZeroes2([0,1,0,3,12], 0))