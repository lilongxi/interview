/**
 * 合并区间 :https://leetcode.cn/problems/merge-intervals/submissions/?envType=study-plan-v2&envId=top-100-liked
 * 考点：单调递增队列 先对数组首位每一个值排序，然后依次合并
 */

var merge = function (intervals = []) {
    const target = []
    intervals.sort((a, b) => a[0] - b[0])
    let prev = intervals[0]
    for (let i = 1; i < intervals.length; i++) {
        const curr = intervals[i]
        // 区间内存在重合
        if (prev[1] >= curr[0]) {
            prev[1] = Math.max(curr[1], prev[1])
        } else {
            target.push(prev)
            prev = curr
        }
    }
    target.push(prev)
    return target
}

/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function(intervals, newInterval) {
    return merge([...intervals, newInterval])
};