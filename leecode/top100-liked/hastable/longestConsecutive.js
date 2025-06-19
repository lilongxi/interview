
/**
 * https://leetcode.cn/problems/longest-consecutive-sequence/?envType=study-plan-v2&envId=top-100-liked
 * 理解：乱序数组中 由小到大能组成的最长连续长度
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
    // 去重
     const setNumber = new Set(nums)
     let longestStreak = 0
     for (const num of setNumber) {
        // 判断set中是否存在连续数字, 则代表从当前数字开始重新计数
        if (!setNumber.has(num - 1)) {
            let currentNum = num
            let currentStreak = 1
            // 是否连续
            while (setNumber.has(currentNum + 1)) {
                // 这里的指针要不停改变 所以不能直接使用 num
                // 判断下一个是否连续
                currentNum++
                // 更新长度
                currentStreak++
            }
            longestStreak = Math.max(longestStreak, currentStreak)
        }
     }
     return longestStreak
};

var longestConsecutive2 = function(nums) {
    if (!nums.length) return 0
    const setNumber = new Set(nums)
    let longestStreak = 1
    for (const num of setNumber) {
        // 证明当前数字再set中存在连续的数字
        if (setNumber.has(num + 1)) {
            let currentStreak = 1
            let currentNum = num
            while (setNumber.has(currentNum + 1)) {
                currentNum++
                currentStreak++
            }
            longestStreak = Math.max(longestStreak, currentStreak)
        }
    }
    return longestStreak
}


console.log(longestConsecutive2([100,4,200,1,3,2]))
// longestConsecutive2([1, 2])

const longestConsecutive3 = function(nums) {
    if (!nums.length) return 0
    // logn
    nums = nums.sort((a, b) => a - b)
    let longest = 1, c = 1
    for (let i = 0; i < nums.length - 1; i++) {
        // base case 排序后 过滤掉前后相同的元素
        if (nums[i] === nums[i + 1]) continue
        c = nums[i] + 1 === nums[i + 1] ? c + 1 : 1
        longest = Math.max(longest, c)
    }
    return longest
}