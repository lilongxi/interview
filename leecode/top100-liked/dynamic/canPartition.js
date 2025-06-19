/**
 * @param {number[]} nums
 * @return {boolean}
 * https://leetcode.cn/problems/partition-equal-subset-sum/?envType=study-plan-v2&envId=top-100-liked
 * 0/1 背包问题 子集背包
 * 
 * 背包问题
 * 1. 01背包
 * 2. 子集背包
 * 3. 完全背包
 */


var canPartition = function(nums) {
    var sum = 0;
    for (var num of nums) sum += num;
    // 和为奇数时，不可能划分成两个和相等的集合
    if (sum % 2 !== 0) return false;
    var n = nums.length;
    sum = sum / 2;
    var dp = new Array(n + 1).fill(false).map(() => new Array(sum + 1).fill(false));
    // base case
    for (var i = 0; i <= n; i++){
        dp[i][0] = true;
    }

    for (var i = 1; i <= n; i++) {
        for (var j = 1; j <= sum; j++) {
            if (j - nums[i - 1] < 0) {
                // 背包容量不足，不能装入第 i 个物品
                dp[i][j] = dp[i - 1][j];
            } else {
                console.log(dp[i - 1][j - nums[i - 1]])
                // 装入或不装入背包
                dp[i][j] = dp[i - 1][j] || dp[i - 1][j - nums[i - 1]];
            }
        }
    }
    console.log(dp)
    return dp[n][sum];
};

/**
 * 
 * @param {*} W 
 * @param {*} N 
 * @param {*} wt 
 * @param {*} val 
 * 给你一个可装载重量为 W 的背包和 N 个物品，
 * 每个物品有重量和价值两个属性。其中第 i 个物品的重量为 wt[i]，价值为 val[i]，
 * 现在让你用这个背包装物品，最多能装的价值是多少？
 */
const knapsack = function (W, N, wt, val) {
    const dp = new Array(N + 1).fill().map(() => new Array(W + 1).fill(0))
    for (let i = 1; i <= N; i++) {
        for (let w = 1; w <= W; w++) {
            // 背包容量已经不够
            if (w - wt[i - 1] < 0) {
                // 只能使用上一次的容量继续装填
                dp[i][w] = dp[i - 1][w]
            } else {
                // 容量够的情况下 要选择装 还是 不装
                dp[i][w] = Math.max(
                    dp[i - 1][w], // 不装
                    dp[i - 1][w - w[i - 1]] + val[i - 1] // 装就需要把背包容量减少 并获取当前物品的价值
                )
            }
        }
    }
    return dp[N][W]
}

console.log(canPartition([1,5,11,5]))