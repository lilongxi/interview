/**
 * https://leetcode.cn/problems/rotate-array/?envType=study-plan-v2&envId=top-100-liked
 * 和移动0类似 
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
    let left = nums.length - k, right = nums.length, lf = 0, point = 0
    const target = []
    while (left < right) target.push(nums[left++])
    while (lf < right) {
        const num = nums[lf]
        if (target.includes(num)) {
            [nums[lf], nums[point]] = [nums[point], nums[lf]]
            point++
            console.log(nums);
        }
        lf++
    }
    // 如果是奇数要再翻一下
    // console.log(nums)
};

var reverse = function(nums, start, end) {
    while (start < end) {
        [nums[start++], nums[end--]] = [nums[end], nums[start]]
    }
}

/**
 * @param {*} nums [ 1,2,3,4,5,6,7 ]
 * @param {*} k 
 * @returns 
 * 1. 先全部反转 [ 7,6,5,4,3,2,1 ]
 * 2. 再反转 头部 [ 5, 6, 7 ] - [ 4, 3, 2, 1 ]
 * 3. 再反转 尾部 [ 5, 6, 7 ] - [ 1, 2, 3, 4 ]
 * 
 * 全部反转后 在从k处解开 两两反转
 */
var rotate2 = function(nums, k) {
    k %= nums.length
    console.log(k)
    /**
     * [
        7, 6, 5, 4,
        3, 2, 1
        ]
     */
    reverse(nums, 0, nums.length - 1)
    /**
     * [
        5, 6, 7, 4,
        3, 2, 1
        ]
     */
    reverse(nums, 0, k - 1)
    /**
     * [
        5, 6, 7, 1,
        2, 3, 4
        ]
     */
    reverse(nums, k, nums.length - 1)
    console.log(nums)
    return  nums
}

/**
 * @param {*} arr 
 * @param {*} k 
 * 思路1: 尾部 pop 头部 shfit
 * 思路2: slice 数组后几位 然后 concat 到头部
 */
const rotate3 = function(arr = [], k) {
    const length = arr.length
    if (!k || !length) return arr
    const step = k % length
    for (let i = 0; i < step; i++) {
        const tail = arr.pop()
        arr.unshift(tail)
    }
    console.log(arr)
    return arr
}

const rotate4 = function(arr = [], k) {
    const length = arr.length
    if (!k || !length) return arr
    const step = k % length
    const part1 = arr.slice(-step)
    const part2 = arr.slice(0, length - step)
    const part3 = part1.concat(part2)
    return part3
}


rotate2([1,2,3,4,5,6,7], 3)