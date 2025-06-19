/**
 * @param {number[]} nums
 * @return {string[]}
 */
var summaryRanges = function(nums) {
    const result = []
    if (nums.length === 1) return [nums[0] + '']
    for (let i = 0; i < nums.length; i++) {
        let curr = nums[i]
        // 内指针不断循环 符合要求的数值
        while (i + 1 < nums.length && (nums[i + 1] - nums[i] === 1)) i++
        if (curr !== nums[i]) {
            result.push(`${curr}->${nums[i]}`)
        } else {
            result.push(curr + '')
        }
    }
    return result
};

console.log(summaryRanges([0,2,3,4,6,8,9]))