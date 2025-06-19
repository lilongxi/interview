/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 * https://leetcode.cn/problems/word-break/?envType=study-plan-v2&envId=top-100-liked
 * 题意：s是一个字符串 dict是一个字符串字典 s里的部分字符串是否能匹配到dict
 */

var permuteRepeat = function(nums) {
    const result = [], track = []
    const backtrack = function(nums) {
        if (track.length === nums.length) {
            result.push([...track])
            return
        }
        for (let i = 0; i < nums.length; i++) {
            track.push(nums[i])
            backtrack(nums)
            track.pop()
        }
    }
    backtrack(nums)
    return result
}

var wordBreak = function(s, wordDict) {
   
};