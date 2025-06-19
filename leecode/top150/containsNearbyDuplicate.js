/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function(nums, k) {
    const s = new Set
    for (let i = 0; i < nums.length; i++) {
        const num = nums[i]
        if (s.has(num)) return true
        s.add(num)
        if (s.size > k) s.delete(nums[i - k])
    }
    return false
};