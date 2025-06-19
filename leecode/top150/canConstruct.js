/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function(ransomNote, magazine) {
    const need = {}
    for (const char of magazine) need[char] = (need[char] || 0) + 1
    for (const char of ransomNote) {
        if (!need[char]) return false
        need[char]--
    }
    return true
};

console.log(canConstruct("aa", "aab"))