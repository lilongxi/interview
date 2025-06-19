/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    if (n <= 2) return n
    const memo = new Array(n + 1).fill(0)
    const helper = function (n) {
        if (n <= 2) return n
        if (memo[n] > 0) return memo[n]
        memo[n] = helper(n - 1) + helper(n - 2)
        return memo[n]
    }
    return helper(n)
};