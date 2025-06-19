/**
 * @param {number[]} nums
 * @return {number[][]}
 * 
 * 子集扩展：输入可以出现重复元素
 * 
 */
var subsetsWithDup = function(nums) {
    const result = [], track = []
    nums.sort((a, b) => a - b);
    const backtrack = function(start) {
        result.push([...track])
        for (let i = start; i < nums.length; i++) {
            if (i > start && nums[i] === nums[i - 1]) continue
            track.push(nums[i])
            backtrack(i + 1)
            track.pop()
        }
    }
    backtrack(0)
    return result
};

console.log(subsetsWithDup([1, 2, 2]))