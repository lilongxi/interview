/**
 * https://leetcode.cn/problems/jump-game/?envType=study-plan-v2&envId=top-100-liked
 * @param {number[]} nums
 * @return {boolean}
 * 
 * 题意：从数组第一个下标开始跳，每一个下标所对应的数字是可跳的个数 是否能到达最后
 * 思路：
 * 
 */
var canJump = function(nums) {
    const n = nums.length
    let farthest = 0
    for (let i = 0; i < n - 1; i++) {
        // i+ nums[i] 从第 i 个位置跳 可以跳多少步
        farthest = Math.max(farthest, i + nums[i])
        // base case 如果遇到 0 那就永远没办法往后跳了
        if (farthest <= i) return false
    }
    // 是否跳到了最后
    return farthest >= n - 1
};

// 跳到最后的最小次数
var canJumpII = function(nums) {
    const n = nums.length
    let end = 0, farthest = 0, jumps = 0
    for (let i = 0; i < n - 1; i++) {
        farthest = Math.max(farthest, i + nums[i])
        // 当 end === i 的时候 证明当前跳过的最远距离就是当前 i 的距离
        if (end === i) {
            jumps++
            end = farthest
        }
    }
    return jumps
}