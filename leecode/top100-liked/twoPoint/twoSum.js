/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
    numbers = numbers.sort((a, b) => a - b)
    let left = 0, right = numbers.length - 1
    while (left < right) {
        const total = numbers[left] + numbers[right]
        if (total === target) {
            // 索引从1开始
            return [left + 1, right + 1]
        } else if (total < target) {
            left++
        } else if (total > target) {
            right--
        }
    }
    return [-1, -1]
};