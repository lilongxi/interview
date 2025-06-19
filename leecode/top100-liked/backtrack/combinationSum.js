/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 * 组合的过程中记录 元素的和
 * https://leetcode.cn/problems/combination-sum/?envType=study-plan-v2&envId=top-100-liked
 * 思路：
 * 标准的回溯算法：
 * 确定回溯是 子集/组合 如果是子集从第一层开始 backtrack(0) 还是 全排列问题 这个需要枚举所有的重复元素
 * 回溯定义变量三要素 result、track、backtrack方法
 * base case ： sum = target
 * 
 * 其实这题虽然叫组合 但是属于排列问题 因为元素可以重复使用
 */
var combinationSum = function(candidates, target) {
    const result = [], track = []
    const backtrack = function(start, totalSum) {
        if (totalSum === target) {
            result.push([...track])
            return
        }
        // 因为可以设置重复元素的原因 所以需要额外的中断条件
        if (totalSum > target) return
        for (let i = start; i < candidates.length; i++) {
            track.push(candidates[i])
            totalSum += candidates[i]
            // 正常的回溯从 i + 1 开始 保证进入下一层进而保证没有重复元素使用
            // 现在求和过程中 需要 重复元素做计算 所以上边需要更多的中断条件
            backtrack(i, totalSum)
            totalSum -= candidates[i]
            track.pop()
        }
    }
    backtrack(0, 0)
    return result
};

console.log(combinationSum([2,3,5], 8))