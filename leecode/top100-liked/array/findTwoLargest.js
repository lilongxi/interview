const findTwoLargest = function(nums) {
    let first_max = second_max = Number.MIN_SAFE_INTEGER
    for (const num of nums) {
        if (num > first_max) {
            second_max = first_max
            first_max = num
        } else if (num > second_max && num !== first_max) {
            second_max = num
        }
    }
    if (second_max === Number.MIN_SAFE_INTEGER) return -1
    return second_max
}

console.log(findTwoLargest([2, 4, 5, 1, 4]))
