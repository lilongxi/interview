/**
 * https://leetcode.cn/problems/trapping-rain-water/description/?envType=study-plan-v2&envId=top-100-liked
 * 
 * 考点：简化成第i个柱子能容纳多少水 通常来说是基于 i 向左找最大的再向右找最大的柱子 然后：最大 - 最小 - i
 * 
 * water[i] = min(max(height[0,..., i]), max(height[i, ..., n - 1])) - height[i]
 * 
 * i 的左边界 和 右边界
 * 
 */

var trap = function(height = []) {
    const n = height.length
    let maxArea = 0
    for (let i = 0; i < n - 1; i++) {
        let l_max = 0, r_max = 0
        // 找到基于i来说最右边最高的柱子
        for (let ri = i; ri < n; ri++) {
            r_max = Math.max(r_max, height[ri])
        }
        // 找到基于i来说最左边最高的柱子
        for (let li = i; li >= 0; li--) {
            l_max = Math.max(l_max, height[li])
        }
        maxArea += Math.min(r_max, l_max) - height[i]
    }
    return maxArea
};

var trapForTwoPoint = function(height = []) {
    if (!height.length) return 0
    const n = height.length
    let left = 0, right = n - 1, maxArea = 0
    let l_max = height[0], r_max = height[n - 1]
    while (left <= right) {
        l_max = Math.max(l_max, height[left])
        r_max = Math.max(r_max, height[right]) 
        // 基于 i 来说左边柱子更小 
        if (l_max < r_max) {
            maxArea += l_max - height[left]
            left++
        } else {
            maxArea += r_max - height[right]
            right--
        }
    }
    return maxArea
}