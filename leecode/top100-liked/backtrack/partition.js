/**
 * @param {string} s
 * @return {string[][]}
 * 分割回文：找到所有回文的组合
 * 组合问题 
 * base case: start === s.length
 */
var partition = function(s) {
    const track = [], result = []
    const backtrack = function(start) {
        if (start === s.length) {
            result.push([...track])
            return
        }
        for (let i = start; i < s.length; i++) {
            // 如果不是回文 跳过循环
            if (!isPalindrome(s, start, i)) continue
            track.push(s.substring(start, i + 1))
            backtrack(i + 1)
            track.pop()
        }
    }
    backtrack(0)
    return result
};

function isPalindrome(s, left, right) {
    while (left < right) {
        if (s[left] !== s[right]) return false
        left++
        right--
    }
    return true
}

console.log(partition('aab'))