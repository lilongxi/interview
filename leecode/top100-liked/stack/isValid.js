/**
 * https://leetcode.cn/problems/valid-parentheses/?envType=study-plan-v2&envId=top-100-liked
 * 
 */


const matchMap = {
    '}': '{',
    ')': '(',
    ']': '['
}

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    if (!s.length) return true
    const stack = []
    const leftSymbols = '{[(', rightSymbols = ')]}'
    for (let i = 0; i < s.length; i++) {
        const str = s[i]
        if (leftSymbols.includes(str)) {
            stack.push(str)
        } else if (rightSymbols.includes(str)) {
            const top = stack[stack.length - 1]
            if (top === matchMap[str]) {
                stack.pop()
            } else {
                return false
            }
        }
    }
    return stack.length === 0
};

console.log(isValid("()"))

const isValid2 = function (s) {
    const left = []
    for (let i = 0; i < s.length; i++) {
        const c = s.charAt(i)
        if (c === '(' || c === '[' || c === '{') {
            left.push(c)
        } else {
            // base case
            if (!left.length) return false
            // 每次从栈低获取元素匹配
            if (leftOf(c) !== left[left.length - 1]) return false
            left.pop()
        }
    }
    return !left.length
}

function leftOf(c) {
    if (c === '}') return '{';
    if (c === ')') return '(';
    return '[';
}
