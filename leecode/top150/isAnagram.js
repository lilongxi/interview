
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 * https://leetcode.cn/problems/valid-anagram/?envType=study-plan-v2&envId=top-interview-150
 */

const encode = function(str) {
    const fill = new Array(26).fill(0)
    for (const char of str) {
        fill[char.charCodeAt() - 'a'.charCodeAt()]++
    }
    return fill.toString()
}

var isAnagram = function(s, t) {
    return encode(s) === encode(t)
};