/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(target, nums) {
    let left = 0, right = 0, total = 0, result = Number.MAX_SAFE_INTEGER
    while (left < nums.length) {
        total += nums[left++]
        while(total >= target) {
            total -= nums[right++]
            result = Math.min(result, left - right + 1)
        }
    }
    return result === Number.MAX_SAFE_INTEGER ? 0 : result
};