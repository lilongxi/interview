/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 * isIsomorphic
 */
var wordPattern = function(pattern, s) {
    const word2ch = new Map, ch2word = new Map
    const words = s.split(' ')
    if (pattern.length !== words.length) return false
    for (const [i, word] of words.entries()) {
        const char = pattern[i]
        const cond1 = word2ch.has(word) && word2ch.get(word) !== char
        const cond2 = ch2word.has(char) && ch2word.get(char) !== word
        if (cond1 || cond2) return false
        word2ch.set(word, char)
        ch2word.set(char, word)
    }
    return true
};

console.log(wordPattern('abba', 'dog cat cat dog'))

const isIsomorphic = function(s, t) {
    const s2t = new Map, t2s = new Map
    for (let i = 0; i < s.length; i++) {
        const x = s[i], y = t[i]
        const cond1 = s2t.has(x) && s2t.get(x) !== y
        const cond2 = t2s.has(y) && t2s.get(y) !== x
        if (cond1 || cond2) return false
        s2t.set(x, y)
        t2s.set(y, x)
    }
    return true
}