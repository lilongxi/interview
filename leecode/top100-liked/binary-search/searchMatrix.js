/**
 * https://leetcode.cn/problems/search-a-2d-matrix/?envType=study-plan-v2&envId=top-100-liked
 *  二维数组映射到一维后 使用 二分 之所以可以这么做是因为 数组映射后必须是有序的
 * 0. 每一行的第一个整熟 大于 上一行最后一个元素
 * 1. right = x * y 
 * 2. 获取具体的 x、y 坐标的时候 转换回来 col = mid / row， row = mid % row
 */

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
    const col = matrix.length, row = matrix[0].length
    console.log(col, row)
    let left = 0, right = col * row - 1;
    while (left <= right) {
        const midd = Math.floor((left + right) / 2)
        // 根据乘的坐标 再除回来 获得真正的 列 索引
        if (getMatrix(matrix, midd) === target) {
            return true
        } else if (getMatrix(matrix, midd) < target) {
            left = midd + 1
        } else if (getMatrix(matrix, midd) > target) {
            right = midd - 1
        }
    }
    return false
};

var getMatrix = function(matrix, idx) {
    const col = matrix.length, row = matrix[0].length
    const colIdx = Math.floor(idx / row), rowIdx = idx % row
    return matrix[colIdx][rowIdx]
}

// console.log(searchMatrix([[1,4],[2,5]], 2))


const searchMatrix2 = function(matrix = [], target) {
    const newMatrix = matrix.reduce((prev, curr) => {
        prev.push(...curr)
        return prev
    }, [])
    let left = 0, right = newMatrix.length - 1
    while (left <= right) {
        const midd = (left + right) >> 1
        if (newMatrix[midd] === target) {
            return true
        } else if (newMatrix[midd] > target) {
            right = midd - 1
        } else if (newMatrix[midd] < target) {
            left = midd + 1
        }
    }
    return false
}

console.log(searchMatrix2([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 60))