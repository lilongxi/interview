/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 * https://leetcode.cn/problems/unique-paths/?envType=study-plan-v2&envId=top-100-liked
 * 
 * 思路：初始化 横向为m 纵向为n 值都为1的 二维数组
 */

var uniquePaths = function(m, n) {
    const dp = new Array(m)
    for(let row = 0; row < n; row++) {
        dp[row] = new Array(m) // 初始化横向列的值为1
        dp[row][0] = 1
    }
    for(let col = 0; col < m; col++) {
        dp[0][col] = 1 // 纵向为1
    }
    for (let row = 1; row < n; row++) {
        for (let col = 1; col < m; col++) {
            dp[row][col] = dp[row - 1][col] + dp[row][col - 1]
        }
    }
    return dp[n - 1][m - 1]
};

uniquePaths(3, 7)