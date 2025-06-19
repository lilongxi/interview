/**
 * @param {string[]} strs
 * @return {string}
 */

const longestCommon = function(str1, str2) {
    let length = Math.min(str1.length, str2.length)
    let left = 0
    while (left < length && str1[left] === str2[left]) {
        left++
    }
    return str1.substring(0, left)
}

var longestCommonPrefix = function(strs) {
    if (!strs.length) return ''
    let prev = strs[0]
    for (let i = 1; i < strs.length; i++) {
        prev = longestCommon(prev, strs[i])
        if (!prev.length) break
    }
    return prev || ''
};