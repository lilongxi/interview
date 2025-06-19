/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 * https://leetcode.cn/problems/subarray-sum-equals-k/solutions/238572/he-wei-kde-zi-shu-zu-by-leetcode-solution/?envType=study-plan-v2&envId=top-100-liked
 * 很像滑动窗口 就是窗口是固定大小
 * 使用 hash 优化
 */
var subarraySum = function(nums, k) {
    let c = 0
    for (let end = 0; end < nums.length; end++) {
        // 相当于一个窗口 每次都是一个 [ start, end ] 的区间
        let total = 0
        for (let start = end; start >= 0; start--) {
            total += nums[start]
            if (total === k) c++
        }
    }
    return c
};