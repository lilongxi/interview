/**
 * https://leetcode.cn/problems/find-all-anagrams-in-a-string/?envType=study-plan-v2&envId=top-100-liked
 */

/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function(s, p) {
    const need = {}, win = {}
    for (const c of p) need[c] = (need[c] || 0) + 1

    let left = 0, right = 0, valid = 0, length = s.length, keyLen = Object.keys(need).length, target = []

    while (right < length) {
        
        const c1 = s[right++]
        win[c1] = (win[c1] || 0) + 1
        if (win[c1] === need[c1]) valid++

        // 缩小窗口的条件？ right - left > p.length 证明可以开始缩小窗口 看是否满足p的条件
        while (right - left >= p.length) {
            // 满足条件记录 左边界
            if (valid === keyLen) {
                target.push(left)
            }
            const c2 = s[left++]
            if (win[c2]-- === need[c2]) valid--
        }

    }
    console.log(target)
    return target
};

findAnagrams('sadbutsad', 'sad')