/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 * 组合 + 子集 本质是同一类问题 框架都一样 区分在于 base case
 */
var combine = function(n, k) {
    const result = [], track = []
    const backtrack = function(start) {
        // 满足 2 个元素就是一个组合
        if (k === track.length) {
            result.push([...track])
            return
        }
        for (let i = start; i <= n; i++) {
            track.push(i)
            backtrack(i + 1)
            track.pop()
        }
    }
    // [1, 2, 3, 4] 的组合 输入0 就变成了 [0, 1, 2, 3, 4]
    backtrack(1)
    return result
};

// [ [ 1, 2 ], [ 1, 3 ], [ 1, 4 ], [ 2, 3 ], [ 2, 4 ], [ 3, 4 ] ]
console.log(combine(4, 2))