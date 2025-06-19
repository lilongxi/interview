/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
    const result = []
    const board = new Array(n)
    for (let i = 0; i < n; i++) board[i] = new Array(n).fill('.')
    const backtrack = function(board, row) {
        if (row === board.length) {
            result.push(Array.from(board, r => r.join('')))
            return
        }
        const length = board.length
        for (let col = 0; col < length; col++) {
            if (!isValid(board, row, col)) continue
            board[row][col] = 'Q'
            backtrack(board, row + 1)
            board[row][col] = '.'
        }
    }
    backtrack(board, 0)
    return result
};

 /* 是否可以在 board[row][col] 放置皇后？*/
 function isValid(board, row, col) {
    var n = board.length;
    // 检查列是否有皇后互相冲突
    for (var i = 0; i <= row; i++) {
      if (board[i][col] === 'Q') {
        return false;
      }
    }
    // 检查右上方是否有皇后互相冲突
    for (var i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (board[i][j] === 'Q') {
        return false;
      }
    }
    // 检查左上方是否有皇后互相冲突
    for (var i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 'Q') {
        return false;
      }
    }
    return true;
  }