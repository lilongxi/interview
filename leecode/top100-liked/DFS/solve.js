/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 *   * 思路 要把4个外边是O 并且和外边是O相连的也是O的找出来 这些元素是永远不会被X包围
  * 在做一次遍历把 NO 设置 O 其他的O设置成X
 */
var solve = function(board) {
    const helper= function(row, col) {
        if (row < 0 || row >= board.length || col < 0 || col >= board[0].length || board[row][col] === 'NO') return
        if (board[row][col] === 'O') {
            board[row][col] = 'NO'
            helper(row + 1, col)
            helper(row - 1, col)
            helper(row, col + 1)
            helper(row, col - 1)
        }
    }
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[0].length; col++) {
            if (row === 0 || row === board.length - 1 || col === 0 || col === board[0].length - 1) {
                if (board[row][col] === 'O') helper(row, col)
            }
        }
    }
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[0].length; col++) {
           if (board[row][col] === 'NO') {
               board[row][col] = 'O'
           } else if (board[row][col] === 'O') {
               board[row][col] = 'X'
           }
        }
    }
};