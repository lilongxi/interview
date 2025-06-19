

/**
 * @param {number[]} nums
 * @return {number}
 * https://leetcode.cn/problems/longest-increasing-subsequence/?envType=study-plan-v2&envId=top-100-liked
 * 子序列：不一定连续
 * 子串：连续
 */

var lengthOfLIS = function(nums) {
    // 定义: dp[i] 表示以 nums[i] 这个数结尾的最长递增子序列的长度
    let dp = new Array(nums.length).fill(1);
    // base case: dp 数组全都初始化为 1
    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                // ??
                dp[i] = Math.max(dp[i], dp[j] + 1)
            }
        }
    }
    return Math.max(...dp)
};

lengthOfLIS([10,9,2,5,3,7,101,18])