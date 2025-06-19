/**
 * https://leetcode.cn/problems/group-anagrams/?envType=study-plan-v2&envId=top-100-liked
 * 字母异位词分组
 * 理解：单词由相同的字母组成只有顺序不同 放到一组
 * 难点：对字母做排序后使用一个hastable去重，可以考虑JS内部的排序 也可以通过.charCodeAt获取该字母对应的 utf-16 编码
 */

const encode = function(s) {
    // [...s].sort.join
    const fill = new Array(26).fill(0)
    for(const char of s) {
        // hash
        fill[char.charCodeAt() - 'a'.charCodeAt()]++
    }
    return fill.toString()
}

var groupAnagrams = function(strs) {
    const targetMap = new Map()
    for (let i = 0; i < strs.length; i++) {
        const arr = strs[i].split('').sort()
        const key = arr.join('')
        if (targetMap.has(key)) {
            targetMap.get(key).push(strs[i])
        } else {
            targetMap.set(key, [strs[i]])
        }
    }
    return [...targetMap.values()]
};

var groupAnagramsForCharCodeAt = function(strs) {
    const targetMap = new Map()
    for(let i = 0; i < strs.length; i++) {
        const code = [...strs[i]].reduce((prev, curr) => prev += curr.charCodeAt(), 0)
        if (targetMap.has(code)) {
            targetMap.get(code).push(strs[i])
        } else {
            targetMap.set(code, [strs[i]])
        }
    }
    return [...targetMap.values()]
}

console.log(groupAnagramsForCharCodeAt(["cab","tin","pew","duh","may","ill","buy","bar","max","doc"]))
