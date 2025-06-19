/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 * https://leetcode.cn/problems/median-of-two-sorted-arrays/description/?envType=study-plan-v2&envId=top-100-liked
 * 思路：两个数组的中位数 归斌排序
 */

const mergeSort = function (a1, a2) {
    const mergeArr = []
    let p1 = 0, p2 = 0, p = 0
    while (p1 < a1.length && p2 < a2.length) {
        mergeArr[p++] = a1[p1] < a2[p2] ? a1[p1++] :  a2[p2++]
    }
    while (p1 < a1.length) mergeArr[p++] = a1[p1++]
    while (p2 < a2.length) mergeArr[p++] = a2[p2++]
    return mergeArr
}

var findMedianSortedArrays = function(nums1, nums2) {
    const sorts = mergeSort(nums1, nums2)
    const length = sorts.length
    const middle = (length - 1) >> 1
    return length % 2 === 0
        ? (sorts[middle] + sorts[middle + 1]) / 2
        : sorts[(length - 1) / 2]
};