
/**
 * https://leetcode.cn/problems/permutation-in-string/
 * 和  找到字符串中所有字母异位词 一样
 * 解法二：子串来一个全排列，然后 includes
 */

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function(s1, s2) {
    const need = {}, win = {}
    for (const c of s1) need[c] = (need[c] || 0) + 1

    let left = 0, right = 0, valid = 0, length = s2.length, keyLen = Object.keys(need).length;

    while (right < length) {
        const c1 = s2[right++]
        
        win[c1] = (win[c1] || 0) + 1
        if (win[c1] === need[c1]) valid++

        // 收缩时机不一样：只要窗口大于子串 s1 即满足查询条件
        // 定长窗口 while 变为 if
        while (right - left >= s1.length) {
            if (valid === keyLen) return true
            const c2 = s2[left++]
            if (win[c2]-- === need[c2]) valid--
        }

    }

    return false

};
