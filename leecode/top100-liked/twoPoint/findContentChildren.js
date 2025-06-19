/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 * https://leetcode.cn/problems/assign-cookies/description/
 */
var findContentChildren = function(g, s) {
    g = g.sort((a, b) => a - b)
    s = s.sort((a, b) => a - b)
    let count = 0, gIdx = 0, sIdx = 0
    while(gIdx < g.length && sIdx < s.length) {
       //  饼干大于等于胃口值 满足条件
        if (s[sIdx] >= g[gIdx]) {
            count++
            gIdx++ // 饼干只有发出去才算消耗掉
        }
        sIdx++
    }
    return count
};