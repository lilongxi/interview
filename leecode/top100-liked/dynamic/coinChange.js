/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 * 凑出 amount 最少要几枚硬币
 */

var coinChange = function(coins, amount) {
    const memo = new Map()
    const helper = function(num) {
        if (memo.has(num)) return memo.get(num)
        if (num === 0) return 0
        if (num < 0) return -1
        let res = Infinity
        for (let coin of coins) {
            let subProblem = helper(num - coin)
            if (subProblem === -1) continue
            res = Math.min(res, subProblem + 1)
        }
        const value = !Number.isFinite(res) ? -1 : res
        memo.set(num, value)
        return value
    }
   return helper(amount)
};

const coinChange2 = function(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity)
    dp[0] = 0
    for (let i = 0; i < dp.length; i++) {
        for (const coin of coins) {
            if (i - coin < 0) continue
            dp[i] = Math.min(dp[i], dp[i - coin] + 1)
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount]
}