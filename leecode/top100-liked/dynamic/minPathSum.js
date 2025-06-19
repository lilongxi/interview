/**
 * @param {number[][]} grid
 * @return {number}
 * https://leetcode.cn/problems/minimum-path-sum/?envType=study-plan-v2&envId=top-100-liked
 * 题意：M * N 的方格 分别对应数字 找到从左上到右下数字和最小的路径
 */
var minPathSum = function(grid) {
    // 备忘录
    const memo = [];

    const dp = function(i, j) {
        // base case
        if (i === 0 && j === 0) {
            return grid[0][0];
        }
        if (i < 0 || j < 0) {
            return Number.MAX_SAFE_INTEGER;
        }
        // 避免重复计算
        if (memo[i] && memo[i][j] !== undefined) {
            return memo[i][j];
        }
        // 构造备忘录，初始值全部设为 -1
        memo[i] = memo[i] || [];
        memo[i][j] = Math.min(
            dp(i - 1, j),
            dp(i, j - 1)
        ) + grid[i][j];

        return memo[i][j];
    }

    return dp(grid.length - 1, grid[0].length - 1);
};