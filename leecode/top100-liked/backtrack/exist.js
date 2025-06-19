/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 * https://leetcode.cn/problems/word-search/description/?envType=study-plan-v2&envId=top-100-liked
 */
var exist = function(board, word) {
    const rowNum = board.length
    const colNum = board[0].length

    const find = function(i, j, cur) {
        if (i >= rowNum || i < 0 ||  j < 0 || j >= colNum) return false
        const now = board[i][j]
        if (now !== word[cur]) return false
        if (cur === word.length - 1) return true
        board[i][j] = null
        const res = find(i+1, j, cur + 1) || find(i-1, j, cur + 1) || find(i, j - 1, cur + 1) || find(i, j + 1, cur + 1)
        board[i][j] = now
        return res
    }

    for(let i  = 0; i < rowNum; i++) {
        for (let j = 0; j < colNum; j++) {
            if (find(i, j, 0)) return true;
        }
    }
    return false
};