/**
 * @param {number[]} prices
 * @return {number}
 * https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/?envType=study-plan-v2&envId=top-100-liked
 * 题目1: 只能交易1次 k = 1
 * 题目2: 可以无限次交易 k = +infinity
 * 题目3: 只能交易2次 k = 2
 * 题目4: 新增 交易冷冻期 和 手续费
 * 
 * 抽象问题的状态：天数（N） * 交易最大次数（K） * 持有状态（0/1）
 * dp[3][2][1] ：代表今天第3天 还可以2次交易 手上持有股票
 * 最终答案：dp[n - 1][k][1]
 * 
 * 今天没有持有股票：max(dp[i - 1][k][0](不买也不买) , dp[i - 1][k][1] + prices[i]（没有持有股票只能卖）)
 * 今天持有股票：max(dp[i - 1][k][1](不买也不买) , dp[i - 1][k][0] - prices[i]（持有股票只能卖）)
 */

var maxProfit = function(prices) {
    // 代表一共多少天
    const n = prices.length 
    // 实例化dp数组：每天都包含2种状态 卖 和 买
    const dp = Array.from({ length: n }, () => new Array(2).fill(0))
    // 初始化 base case  第一天不买也不卖就是 0 如果卖入就只能买出了 -prices[0]
    dp[0][0] = 0
    dp[0][1] = -prices[0] // 卖
    for (let i = 1; i < n; i++) {
        // 买
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i])
        // 卖 注意这里只能买卖一次
        dp[i][1] = Math.max(dp[i - 1][1], 0 - prices[i])
    }
    return dp[n - 1][0]
};

var maxProfit_k_inf = function(prices) {
    const n = prices.length
    const dp = Array.from({ length: n }, () => new Array(2).fill(0))
    dp[0][0] = 0
    dp[0][1] = -prices[0]
    for (let i = 1; i < n; i++) {
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i])
        // 注意这里 k 为 无限次 就证明每一次都可以卖或者买
        dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i])
    }
    return dp[n - 1][0]
}


var maxProfit_with_fee = function(prices, fee) {
    const n = prices.length
    const dp = Array.from({ length: n }, () => new Array(2).fill(0))
    dp[0][0] = 0
    dp[0][1] = -prices[0] - fee
    for (let i = 1; i < n; i++) {
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i])
        // 注意这里 k 为 无限次 就证明每一次都可以卖或者买
        dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i] - fee)
    }
    return dp[n - 1][0]
}