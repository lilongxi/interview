/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    let i = m - 1, k = n - 1
    const nums = []
    while (i >= 0 && k >= 0) {
        if (nums1[i] > nums2[k]) {
            nums.push(nums2[k--])
        } else {
            nums.push(nums1[i--])
        }
    }
    
};

console.log(merge([1,2,3,0,0,0], 3, [2,5,6], 3))