/**
 * @param {number} x
 * @return {boolean}
 * 回文数
 */
var isPalindrome = function(x) {
    x =( x + '') + (x + '')
    console.log(x)
    let left = 0, right = x.length - 1
    while (left < right) {
        if (x[left++] !== x[right--]) return false
    }
    return true
};

console.log(isPalindrome(121))