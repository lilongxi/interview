/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    const result = [], track = []
    const backtrack = function(start) {
        // 收集所有节点 没有 base case
        result.push([...track])
        for (let i = start; i < nums.length; i++) {
            // 每一层进入后先扔一个数字
            track.push(nums[i])
            // 向下探一层
            backtrack(i + 1)
            track.pop()
        }
    }
    // 从第一层开始
    backtrack(0)
    return result
};

console.log(subsets([1, 2, 2]))