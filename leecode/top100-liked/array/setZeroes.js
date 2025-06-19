/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 * 
 */

var setZeroes = function(matrix) {

    const m = matrix.length, n = matrix[0].length
    const row = new Array(m).fill(false)
    const col = new Array(n).fill(false)
    
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === 0) {
            // 如下例子所示 1 行 1 列 是 0
                row[i] = col[j] = true
            }
        }
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            // 该列 该行所有数据都设置为 0
            if (row[i] || col[j]) {
                matrix[i][j] = 0
            }
        }
    }

    console.log(matrix)

};

setZeroes([[1,1,1],[1,0,1],[1,1,1]])