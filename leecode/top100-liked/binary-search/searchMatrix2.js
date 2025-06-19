/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 * https://leetcode.cn/problems/search-a-2d-matrix-ii/description/?envType=study-plan-v2&envId=top-100-liked
 * 区别在于 每一行的第一个整熟 不一定大于 上一行最后一个元素 所以整个二维不是有序的
 * 思路：但是每一行是有序的 就是说最后一个一定比前一个大
 * 题解：https://leetcode.cn/problems/search-a-2d-matrix-ii/solutions/441631/hua-tu-jie-ti-sou-suo-er-wei-ju-zhen-ii-by-ji-jue-/?envType=study-plan-v2&envId=top-100-liked
 */
var searchMatrix = function(matrix, target) {
    const m = matrix.length, n = matrix[0].length
    let i = 0, j = n - 1
    // 两个指针分别指向有序数组的 头和尾
    // 如果 target 小于该值 就横向往后找
    // 如果 target 大于该值
    while (i < m && j >= 0) {
        if (matrix[i][j] === target) return true
        if (matrix[i][j] < target) {
            i++
        } else {
            j--
        }
    }
    return false
};