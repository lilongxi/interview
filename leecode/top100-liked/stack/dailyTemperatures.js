/**
 * @param {number[]} temperatures
 * @return {number[]}
 * https://leetcode.cn/problems/daily-temperatures/?envType=study-plan-v2&envId=top-100-liked
 * 题意：找到下一个更高元素和当前元素的索引差值、本质上就是找下一个最大元素
 */

var nextGreaterElement = function(nums) {
    // s 是一个单调递减的队列
    const s = [], result = []
    for(let i = nums.length - 1; i >= 0; i--) {
        while (s.length && s[s.length - 1] <= nums[i]) {
            s.pop()
        }
        result[i] = s.length ? s[s.length - 1] : 0
        s.push(nums[i])
    }
    console.log(result)
    return result
}

var dailyTemperatures = function(temperatures) {
    // s 需要放索引 
    const s = [], result = []
    for (let i = temperatures.length - 1; i >= 0; i--) {
        // 上一个入栈的元素 比 这当前的小 就没啥用了
        // 由于 s 是一个单调递减的队列 如果要维护其单调性 必须把大的都移除
        while (s.length && temperatures[s[s.length - 1]] <= temperatures[i]) {
            s.pop()
        }
        // 计算
        result[i] = !s.length ? 0 : (s[s.length - 1] - i)
        // 索引入栈
        s.push(i)
    }
    return result
};

console.log(dailyTemperatures([73,74,75,71,69,72,76,73]))