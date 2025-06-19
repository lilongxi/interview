/**
 * https://leetcode.cn/problems/3sum/?envType=study-plan-v2&envId=top-100-liked
 * twoSum 是最小解
 */

const twoSumTarget = function(nums = [], start = 0, target) {
    nums = nums.sort((a, b) => a - b)
    let left = start, right = nums.length - 1
    const targetArr = []
    while (left < right) {
        const leftValue = nums[left]
        const rightValue = nums[right]
        const sum = nums[left] + nums[right]
        if (sum === target) {
            targetArr.push([nums[left], nums[right]])
            // 跳过相同的元素
            while (left < right && nums[left] === leftValue) left++
            while (left < right && nums[right] === rightValue) right--
        } else if (sum < target) {
            // 跳过相同的元素
            while (left < right && nums[left] === leftValue) left++
        } else if (sum > target) {
            // 跳过相同的元素
            while (left < right && nums[right] === rightValue) right--
        }
    }
    return targetArr
}

var threeSum = function(nums, target = 0) {
    nums = nums.sort((a, b) => a - b)
    const targetTuples = []
    for (let i = 0; i < nums.length; i++) {
        const tuples = twoSumTarget(nums, i + 1, target - nums[i])
        for (let k = 0; k < tuples.length; k++) {
            const tuple = tuples[k]
            tuple.push(nums[i])
            targetTuples.push(tuple)
        }
        while (i < nums.length - 1 && nums[i] === nums[i + 1]) i++
    }
    return targetTuples
};