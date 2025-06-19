/**
 * @param {number[]} nums
 * @return {number}
 * https://leetcode.cn/problems/single-number/?envType=study-plan-v2&envId=top-100-liked
 * 思路：位运算
 * result = 0
 * result ^= 1 -> 1
 * result ^= 1 -> 0
 * 
 * result ^= 1 -> 1
 * result ^= 100 -> 101
 * result ^= 1 -> 100
 * result ^= 100 -> 0
 */
var singleNumber = function(nums) {
    let result = 0
    for (const n of nums) {
        result ^= n
    }
    return result
};