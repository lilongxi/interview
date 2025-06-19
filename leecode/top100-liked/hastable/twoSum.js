/**
 * page319
 * 考点：哈希表
 * 难点：再于数组是无序的，所以只能穷举或者使用hasMap处理无序的数组
 * 扩展：
 * 1. 数组是有序的 可以使用双指针
 * 2. twoSumTarget 当数组内存在多个符合target的值，需要同时返回且不能重复
 */

var twoSum = function(nums, target) {
    if (!nums.length) return [-1, -1]
    const targetMap = {}
    for (let i = 0; i < nums.length; i++) {
        const targetValue = target - nums[i]
        if (Reflect.has(targetMap, targetValue)) {
            return [i, Reflect.get(targetMap, targetValue)]
        }
        Reflect.set(targetMap, nums[i], i)
    }
    return [-1, -1]
};

var twoSumSolution2 = function(nums, target) {
    if (!nums.length) return [-1, -1]
    const targetMap = nums.reduce((prev, curr, idx) => {
        Reflect.set(prev, curr, idx)
        return prev
    }, {})
    for (let i = 0; i < nums.length; i++) {
        const v = target - nums[i]
        const idx = Reflect.get(targetMap, v)
        if (Reflect.has(targetMap, v) && idx !== i) return [i, idx]
    }
    return [-1, -1]
}

var twoSumForTwoPoint = function(nums, target) {
    if (!nums.length) return [-1, -1]
    nums = nums.sort()
    let left = 0, right = nums.length - 1
    while (left < right) {
        const v = nums[left] + nums[right]
        if (v === target) {
            return [left, right]
        } else if (v < target) {
            left++ // 值小了 大一点
        } else if (v > target) {
            right--
        }
    }
    return [-1, -1]
}


var twoSumTarget = function(nums, start = 0, target) {
    if (!nums.length) return [0, 0]
    nums = nums.sort()
    let left = start, right = nums.length - 1
    const res = []
    while (left < right) {
        // 记录原始值
        const leftValue = nums[left]
        const rightValue = nums[right]
        const sum = nums[left] + nums[right]
        if (sum === target) {
            res.push([nums[left], nums[right]])
            // left++
            // right--
            // 跳过相同的元素
            while (left < right && nums[left] === leftValue) left++
            while (left < right && nums[right] === rightValue) right--
        } else if (sum < target) {
            // left++
            while (left < right && nums[left] === leftValue) left++
        } else if (sum > target) {
            // right--
            while (left < right && nums[right] === rightValue) right--
        }
    }
    return res
}

// console.log(twoSumTarget([1, 3, 1, 2, 2 ,3], 4))
var threeSumTarget = function(nums, target) {
    nums = nums.sort()
    const length = nums.length
    const res = []
    for (let i = 0; i < length; i++) {
        // 枚举所有满足条件的二元组
        const tuples = twoSumTarget(nums, i + 1, target - nums[i])
        // 二元组 + nums[i] 就是三元组
        for (let k = 0; k < tuples.length; k++) {
            const tuple = tuples[k]
            tuple.push(nums[i])
            res.push(tuple)
        }
        // 去掉前后相同的元素
        while (i < length - 1 && nums[i] === nums[i + 1]) i++
    }
    return res
}

console.log(threeSumTarget([-1, 0, 1, 2, -1, -4], 0))