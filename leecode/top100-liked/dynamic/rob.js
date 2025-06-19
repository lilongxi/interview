const rob1 = function(nums) {
    const memo = new Array(nums.length).fill(null);
    const helper = function(start) {
        if (start >= nums.length) return 0
        if (memo[start]) return memo[start]
        // 比较两个值 第i家 不抢 或者 第i家我要抢然后就只能抢下下家
        const val = Math.max(helper(start + 1), nums[start] + helper(start + 2))
        memo[start] = val
        return val
    }
    return helper(0)
}

const rob = function(nums) {
    const n = nums.length
    const dp = new Array(n + 2).fill(0)
    for (let i = n - 1; i >= 0; i--) {
        dp[i] = Math.max(dp[i + 1], nums[i] + dp[i + 2])
    }
    return dp[0]
}

const robStart = function(nums) {
    const n = nums.length
    const dp = new Array(n + 2).fill(0)
    dp[0] = nums[0]
    dp[1] = Math.max(nums[0], nums[1])
    for (let i = 2; i < n; i++) {
        dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i])
    }
    return dp[n - 1]
}