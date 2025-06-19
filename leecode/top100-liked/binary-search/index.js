// function binarySearch(nums = [], target) {
//     let left = 0, right = nums.length - 1
//     while (...) {
//         const mid = left + (right - left) / 2
//         if (nums[mid] === target) {
//             left = ...
//         } else if (nums[mid] < target) {
//             right = ...
//         }
//     }
//     return ...
// }

/**
 * 
 * @param {*} nums 
 * @param {*} target 
 * @returns
 * 二分特点：数组必须是有序的 
 */
const binarySearch = function(nums, target) {
    let left = 0, right = nums.length - 1
    while (left <= right) {
        let midd = Math.floor((left + right) / 2)
        if (nums[midd] === target) {
            return midd
        } else if (nums[midd] < target) {
            left = midd + 1
        } else if (nums[midd] > target) {
            right = midd - 1
        }
    }
    return -1
}

/**
 * 查找左侧边界 [1, 2, 2, 2, 3, 4]  期望返回最左侧 2 的索引
 * 相当于不停的减少 right 的边界
 */
const left_bound = function(nums, target) {
    let left = 0, right = nums.length - 1
    while (left <= right) {
        let midd = Math.floor((left + right) / 2)
        // 因为要找最左侧的索引 所以把右侧区间继续缩小
        if (nums[midd] === target) {
            right = midd - 1
        } else if (nums[midd] > target) {
            right = midd - 1
        } else if (nums[midd] < target) {
            left = midd + 1
        }
    }
    // 边界
    if (left >= nums.length || nums[left] !== target) return -1
    return left
}

console.log(left_bound([1, 2, 2, 2, 3, 4], 2))

// 查找右侧边界 [1, 2, 2, 2, 3, 4]  期望返回最右侧 2 的索引

const right_bound = function(nums, target) {
    let left = 0, right = nums.length - 1
    while (left <= right) {
        let midd = Math.floor((left + right) / 2)
        // 当找右侧边界的时候 因为要找最右侧 扩大左区间
        if (nums[midd] === target) {
            left = midd + 1
        } else if (nums[midd] > target) {
            right = midd - 1
        } else if (nums[midd] < target) {
            left = midd + 1
        }
    }
    if (right < 0 || nums[right] !== target) return -1
    return right
}

console.log(right_bound([1, 2, 2, 2, 3, 4, 5], 20))