/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    const subPalindrome = function(left, right) {
        console.log(left, right)
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            left--
            right++
        }
        return s.substr(left + 1, right - left - 1)
    }
    let result = ''
    for (let i = 0; i < s.length; i++) {
        // 奇数的回文
        const s1 = subPalindrome(i, i)
        // 偶数的回文
        const s2 = subPalindrome(i, i + 1)
        result = result.length > s1.length ? result : s1
        result = result.length > s2.length ? result : s2
    }
    return result
};

console.log(longestPalindrome('babad'))