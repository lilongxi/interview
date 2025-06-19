/**
 * 
 * @param {*} s 
 * 滑动窗口计算字符串中出现最多次的字母
 */
var maxLength = function(s) {
    const w = {}
    let left = 0, right = 0, result = 0
    while (left < s.length) {
        const char = s[right++]
        w[char] ? w[char]++ : (w[char] = 1)
        console
        // 证明已经在出现第二次 缩小窗口并更新最值
        while (w[char] > 1) {
            const char2 = w[left++]
            w[char2]--
        }
        result = Math.max(result, right - left)
    }
    return result
}

console.log(maxLength('lilongxi'))