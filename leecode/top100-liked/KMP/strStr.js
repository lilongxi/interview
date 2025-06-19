/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 * https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string/?envType=study-plan-v2&envId=top-interview-150
 * 1. 滑动窗口
 * 2. KMP
 */
var strStr = function(haystack, needle) {
    const w = {}, need = {}
    for (const char of needle) need[char] = (need[char] || 0) + 1
    let left = 0, right = 0, valid = 0
    const needLength = Object.keys(need).length, result = [], length = haystack.length
    while (right < length) {
        const c1 = haystack[right++]
        w[c1] = (w[c1] || 0) + 1
        if (w[c1] === need[c1]) valid++
        while (right - left >= needle.length) {
            if (valid === needLength) {
                const str = haystack.substring(left, right)
                if (str === needle) result.push(left)
            }
            const c2 = haystack[left++]
            if (w[c2]-- === need[c2]) valid--
        }
    }
    console.log(result)
    return result.length ? result[0] : -1
};

strStr('mississippi', 'pi')
