/**
 * https://leetcode.cn/problems/container-with-most-water/description/?envType=study-plan-v2&envId=top-100-liked
 * 盛水最多的容器考点：双指针分别找到左侧和右侧最高的位置
 * 本质上和 twoSum 双指针版本很像 循环中两个前后指针依次计算面积 只有指针移动条件不同
 * 思路：先算第i个 找到基于第 i 个的最右侧最高的一边
 * water[i] = 
 */

var maxArea = function(height) {
  let left = 0, right = height.length - 1
  let maxArea = 0
  while (left < right) {
    // 底边 * 最小的高
    const currentArea = (right - left) * Math.min(height[left], height[right])
    maxArea = Math.max(currentArea, maxArea)
    // 如果left小于right 就保留right使用left向后找更大的
    if (height[left] < height[right]) {
        left++
    } else {
        right--
    }
  }
  return maxArea
};