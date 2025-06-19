/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 * https://leetcode.cn/problems/edit-distance/?envType=study-plan-v2&envId=top-100-liked
 * 
 * 核心点
 * 把 word1 变成 word2，不需要对 word2 做任何操作 只对 word1 做增删改操作
 * 
 */
var minDistance = function(word1, word2) {

    if (word1 === word2) return 0
    const row = word1.length
    const col = word2.length
    if (!row || !col) return row || col
    const dp = Array.from(new Array(row+1), () => new Array(col+1).fill(0))

    // base case
    for(let i = 1; i <= row; i++) {
        dp[i][0] = i
    }
    for(let j = 1; j <= col; j++) {
        dp[0][j] = j
    }


    for(let i = 1; i <= row; i++) {
        for(let j = 1; j <= col; j++) {
            // 从第一个开始判断
            if (word1[i-1] === word2[j-1]) {
                // dp[i][j] = Math.min(dp[i][j-1], dp[i-1][j]) + 1
                dp[i][j] = dp[i-1][j-1]
            } else {
                /**
                 * dp[i-1][j] 当 word1 完全匹配完 word2 后 也就是 word2 已经完全完成 插入和修改 只剩下 word1 做删除了
                 * dp[i][j-1] word1 为了匹配 word2 做了一次插入操作后两个单词相等了 所以 word2 指针向前走
                 * dp[i-1][j-1] word1 变成 word2 通过替换一个单词完成
                 */
                dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1
            }
        }
    }

    return dp[row][col]
};

console.log(minDistance('intention', 'execution')) // etion