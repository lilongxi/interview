/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 * https://leetcode.cn/problems/longest-common-subsequence/?envType=study-plan-v2&envId=top-100-liked
 * 
 * 题意：字符串A 和 字符串B 存在相同的字符子序列的长度
 * 
 * 如 abcde 和 ace 都包含 ace 且它最长
 * 
 * base case:
 * A[i] === B[j] : dp[i][j] = dp[i - 1][j - 1] + 1
 * A[i] !== B[j] : dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
 */
var longestCommonSubsequence = function(text1, text2) {
    const row = text1.length, col = text2.length
    const dp = Array.from(new Array(row + 1).fill(0), () => new Array(col + 1).fill(0))
    for (let i = 1; i <= row; i++) {
        for (let j = 1; j <= col; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i-1][j-1] + 1
            } else {
                dp[i][j] = Math.max(dp[i][j-1], dp[i-1][j])
            }
        }
    }
    return dp[row][col]
};

const minDistanceIII = function(s1, s2) {
    let m = s1.length, n = s2.length
    let lcs = longestCommonSubsequence(s1, s2)
    return m - lcs + n - lcs
}

console.log(longestCommonSubsequence('abcde', 'ace'))
console.log(minDistanceIII('intention', 'execution')) // etion
// 9 - 5 + 9 -5