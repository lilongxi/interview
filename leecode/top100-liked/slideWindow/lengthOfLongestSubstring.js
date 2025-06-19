/**
 * https://leetcode.cn/problems/longest-substring-without-repeating-characters/?envType=study-plan-v2&envId=top-100-liked
 * 题点：最长 无重复子串
 */

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    const windowMap = {}
    let left = 0, right = 0, res = 0
    while (right < s.length) {
        const c = s[right++]
        windowMap[c] = (windowMap[c] || 0) + 1
        // 证明该字符在串中出现了第二次（这个时候命中了题点 - 无重复最长子串）
        // 开始向左缩小窗口 当窗口中没有任何一个字符再出现第二次即视为一个满足条件后更新结果
        while (windowMap[c] > 1) {
            const c1 = s[left++]
            windowMap[c1]--
        }
        // 使用左右区间 更新结果
        res = Math.max(res, right - left)
    }
    return res
};

lengthOfLongestSubstring('abcabcbb')

// 使用 双指针维护一个 动态变化的 区间
const lengthOfLongestSubstring2 = function(s) {
    const w = {}
    let left = 0, right = 0, result = 0
    while (right < s.length) {
        const c1 = s[right++]
        // 记录词频
        w[c1] = (w[c1] || 0) + 1
        // 窗口出现重复单词
        while (w[c1] > 1) {
            const c2 = s[left++]
            if (w[c2]) w[c2]--
        }
        // 跳出内循环的时候 证明窗口已经没有重复的单词了 视为一个无重复子串
        result = Math.max(result, right - left)
    }
    return result
}