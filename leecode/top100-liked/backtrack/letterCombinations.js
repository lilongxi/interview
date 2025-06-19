/**
 * @param {string} digits
 * @return {string[]}
 * 考点：digits输入是2个数就是2个字母的组合 3个数就是3个字母的组合
 * 本质就是 组合 需要一个映射
 * [
  'ad', 'ae', 'af',
  'bd', 'be', 'bf',
  'cd', 'ce', 'cf'
]
 */

var letterCombinations = function(digits) {
    const mapping = ["", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];
    const result = [], track = []
    if (!digits.length) return result
    const backtrack = function(start) {
        if (track.length === digits.length) {
            result.push([...track].join(''))
            return
        }
        for (let i = start; i < digits.length; i++) {
            const digit = digits[i]
            // 因为组合是根据 digits 变化的 N * N 所以需要两次循环
            for(const c of mapping[digit]) {
                track.push(c)
                backtrack(i + 1, track)
                track.pop()
            }
        }
    }
    backtrack(0, track)
    return result
};

console.log(letterCombinations("23"))