/**
 * @param {number} x
 * @return {number}
 * https://leetcode.cn/problems/sqrtx/solutions/2308517/mo-ni-fa-er-fen-fa-niu-dun-die-dai-fa-js-69us/?envType=study-plan-v2&envId=top-interview-150
 * 思路：本质是 二分 target = midd * midd
 */
var mySqrt = function(x) {
    if (x <= 1) return x
    let left = 0, right = x
    while (left <= right) {
        const midd = Math.floor((left + right) / 2)
        const sqrt = midd * midd
        if (sqrt === x) {
            return midd
        } else if (sqrt > x) {
            right = midd - 1
        } else if (sqrt < x) {
            left = midd + 1
        }
    }
    return right
};