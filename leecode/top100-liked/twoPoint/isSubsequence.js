/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 * https://leetcode.cn/problems/is-subsequence/?envType=study-plan-v2&envId=top-interview-150
 * 判断子序列：二分依次记录 两个字符串中出现相同字符的个数 当最后其中一个变量等于某个字符串长度即存在子串
 */
var isSubsequence = function(s, t) {
    let i = 0, k = 0
    while (i < s.length && k < t.length) {
        if (s[i] === t[k]) {
            i++
        }
        k++
    }
    return i === s.length
};