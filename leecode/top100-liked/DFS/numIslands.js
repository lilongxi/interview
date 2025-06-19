
/**
 * @param {character[][]} grid
 * @return {number}
 * https://leetcode.cn/problems/number-of-islands/?envType=study-plan-v2&envId=top-100-liked
 * 思路
 */
var numIslands = function(grid) {
    let result = 0
    const helper = function (row, col) {
        if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length || grid[row][col] == 0) return
        // 该块陆地已经找到并记录 这个操作保证不被重复记录 相当于 vistied 节点
        grid[row][col] = 0
        helper(row + 1, col)
        helper(row - 1, col)
        helper(row, col + 1)
        helper(row, col - 1)
    }
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            // 找到陆地了；
            if (grid[row][col] == 1) {
                result++
                // 继续基于当前坐标 向上下左右找 使用 DFS 递归遍历
                helper(row, col)
            }
        }
    }
    return result
};