const lengthOfLastWord = function(s) {
    let length = s.length - 1
    while (s[length] === ' ') length--
    let wordLength = 0
    while (length >= 0 && s[length] !== ' ') {
        wordLength++
        length--
    }
    console.log(wordLength)
    return wordLength
}

lengthOfLastWord('   fly me   to   the moon  ')

const reverseWords = function(s) {
    const stk = []
    let left = 0, right = s.length - 1, word = ''
    while (left <= right && s.charAt(left) === ' ') left++
    while (left <= right && s.charAt(right) === ' ') right--
    while (left <= right) {
        const char = s.charAt(left)
        if (char === ' ' && word) {
            stk.unshift(word)
            word = ''
        } else if (char !== ' ') {
            word += char
        }
        left++
    }
    if (word) stk.unshift(word)
    return stk.join(' ')
}

const isPalindrome = function(s) {
    s = s.replace(/[\W|_]/g, "").toLowerCase();
    if (s.length < 2) {
        return true;
    }
    let left = 0, right = s.length
    while (left < right) {
        if (s[left] !== s[right]) return false
        left++
        right--
    }
    return true
}