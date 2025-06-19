/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    let slow = 0, fast = 0
    while (fast < nums.length) {
        if (nums[fast] !== val) {
            nums[slow] = nums[fast]
            // slow 加了多少次 就证明 fast 有多少次不等于 val
            slow++
        }
        fast++
    }
    return slow
};