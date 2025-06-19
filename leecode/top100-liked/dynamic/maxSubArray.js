var maxSubArray = function(nums = []) {
    let sum = Number.MIN_SAFE_INTEGER
    for (let i = 0; i < nums.length; i++) {
        let curr = 0
        for (let k = i; k < nums.length; k++) {
            curr += nums[k]
            sum = Math.max(sum, curr)
        }
    }
    return sum
}

var maxSubArray3 = function(nums = []) {
    const length = nums.length
    if (!length) return 0
    const dp = new Array(length)
    dp[0] = nums[0]
    for (let i = 1; i < length; i++) {
        dp[i] = Math.max(nums[i], nums[i] + dp[i - 1])
    }
    return Math.max(...dp)
}

// 动态压缩
var maxSubArrayDp2 = function(nums = []) {
    const n = nums.length
    if (!n) return 0
    let dp_0 = nums[0]
    let dp_1 = 0, res = dp_0
    for (let i = 1; i < length; i++) {
        dp_1 = Math.max(nums[i], nums[i] + dp_0)
        dp_0 = dp_1
        res = Math.max(res, dp_1)
    }
    return res
}

console.log(maxSubArrayDp([-2,1,-3,4,-1,2,1,-5,4]))