
/***
 * 全排列的问题
 * 元素不重复 不可复选
 * 不可复选：使用字典处理
 * base case: nums.lenth === track.length
 */

var permute = function(nums) {
    const res = [], track = [], used = new Array(nums.length).fill(false)
    const backtrack = function(nums, track, used) {
        // 中断条件 形成组合的排列长度 等于 输入的数字的长度
        // 这里是全排列所以是 length 如果是 2 的排列 就是 nums.length === 2
        if (nums.length === track.length) {
            res.push([...track])
            return
        }
        // 穷举 这里
        for (let i = 0; i < nums.length; i++) {
            // 排列的字母不能重复
            if (used[i]) continue
            track.push(nums[i])
            used[i] = true
            // 递归下一个
            backtrack(nums, track, used)
            // 当完成一次组合后 将排列的状态 还原回去
            track.pop()
            used[i] = false
        }
    }
    backtrack(nums, track, used)
    return res
}

console.log(permute([1,2,3]))