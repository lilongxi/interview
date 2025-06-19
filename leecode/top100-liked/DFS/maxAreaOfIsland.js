/**
 * https://leetcode-cn.com/problems/max-area-of-island/
 * 695. 岛屿的最大面积
 */

const maxAreaOfIsland = function(grid) {
    let maxArea = 0
    const helper = function(row, col) {
        let maxValue = 0
        if (row < 0 || row >= grid.length || col < 0 || col >= grid[row].length || grid[row][col] === 0) return maxValue
        grid[row][col] = 0
        maxValue++
        maxValue += helper(row + 1, col)
        maxValue += helper(row - 1, col)
        maxValue += helper(row, col + 1)
        maxValue += helper(row, col - 1)
        return maxValue
    }
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            const value = helper(row, col)
            maxArea = Math.max(maxArea, value)
        }
    }
    return maxArea
}