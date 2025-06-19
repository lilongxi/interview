/**
 * https://leetcode.cn/problems/spiral-matrix/description/?envType=study-plan-v2&envId=top-100-liked
 * 思路：即从左到右 -》从上到下 -》从右到左 =》 从下到上 依次遍历
 * base case ：left <= matrix[0].length - 1, top <= matrix.length - 1
 */

var spiralOrder = function(matrix) {
    if (!matrix.length) return []
    let top = 0, bottom = matrix.length - 1, left = 0, right = matrix[0].length - 1
    let i
    const result = []
    while ( top <= bottom && left <= right) {
        // 左到右 开始滴一行
        for (i = left; i <= right; i++) result.push(matrix[top][i])
        // 行遍历完 向下探一行 开始 上到下
            top++
        for (i = top; i <= bottom; i++) result.push(matrix[i][right])
        // 列遍历完 此时处于右下 开始右到左
            right--
        // base case
        if (top > bottom || left > right) break
        for (i = right; i >= left; i--)  result.push(matrix[bottom][i])
            bottom--
        for (i = bottom; i >= top; i--) result.push(matrix[i][left])
            left++
    }
    return result
}

// if (!matrix.length) return []
// let top = 0, bottom = matrix.length - 1, left = 0, right = matrix[0].length - 1, i
// const ret = []
// while (top <= bottom && left <= right) {
//     for (i = left; i <= right; i++) ret.push(matrix[top][i])
//         top++
//     for (i = top; i <= bottom; i++) ret.push(matrix[i][right])
//         right--
//     if (top > bottom || left > right) break
//     for (i = right; i >= left; i--) ret.push(matrix[bottom][i])
//         bottom--
//     for (i = bottom; i >= top; i--) ret.push(matrix[i][left])
//         left++
// }
// return ret