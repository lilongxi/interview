/**
 * https://leetcode.cn/problems/longest-valid-parentheses/?envType=study-plan-v2&envId=top-100-liked
 */

/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function(s) {
    let result = 0
    const stk = []
    for (let i = 0; i < s.length; i++) {
        const c = s.charAt(i)
        if (c === '(') {
            stk.push(c)
        } else {
            stk.pop()
            if (stk.length) {
                const curMathlength = i - stk[stk.length - 1]
                result = Math.max(result, curMathlength)
            } else {
                stk.push(i)
            }
        }
    }
};