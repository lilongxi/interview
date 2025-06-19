/**
 * @param {number} n
 * @return {string[]}
 * https://leetcode.cn/problems/generate-parentheses/?envType=study-plan-v2&envId=top-100-liked
 * 组合问题
 * 思路：括号生成 左右括号分别做回溯 括号是可以重复的 两个左括号就要匹配两个右括号
 * base case : 根据 n 生成括号数量
 */
var generateParenthesis = function(n) {
  if (!n)   return []
  const result = []
  let trackPath = ''
  const backtrack = function(left, right, trackPath) {
    if (right < left) return
    if (left < 0 || right < 0) return
    if (left === 0 && right === 0) {
        result.push(trackPath)
        return
    }
    trackPath += '('
    backtrack(left - 1, right, trackPath)
    // 撤销选择 切掉字符串尾部最后一个字符 相当于减去 左括号
    trackPath = trackPath.slice(0, -1)
    trackPath += ')'
    backtrack(left, right - 1, trackPath)
    trackPath = trackPath.slice(0, -1)
  }
  backtrack(n, n, trackPath)
  return result
};

var generateParenthesis2 = function(n) {
  const ret = []
  const backtrack = function(left, right, s) {
      if (left === n && right === n) ret.push(s)
      if (left < n) backtrack(left + 1, right, s + '(')
      if (left > right) backtrack(left, right + 1, s + ')')
  }
  backtrack(0, 0, '')
  return ret
}


console.log(generateParenthesis(3))