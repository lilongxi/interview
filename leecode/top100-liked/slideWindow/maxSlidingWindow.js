// https://labuladong.github.io/algo/di-yi-zhan-da78c/shou-ba-sh-daeca/dan-diao-d-32cd5/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 * 
 *  滑动窗口的位置                 最大值
    ---------------              -----
    [1  3  -1] -3  5  3  6  7      3
    1 [3  -1  -3] 5  3  6  7       3
    1  3 [-1  -3  5] 3  6  7       5
    1  3  -1 [-3  5  3] 6  7       5
    1  3  -1  -3 [5  3  6] 7       6
    1  3  -1  -3  5 [3  6  7]      7

 */
// 每次只保留最大的元素 且 只有一个
    class MonotonicQueue {

        constructor () {
            this.maxq = []
        }
    
        // 在队尾添加元素 n
        push (n) {
            // 如果最后一个元素比n小 就推出去 只保留最大
            while (this.maxq.length && this.maxq[this.maxq.length - 1] < n) {
                // 反正都不是最大的 可以起开了
                this.maxq.pop()
            }
            // 继续推入新元素
            this.maxq.push(n)
        }
    
        // 返回当前队列中的最大值
        max () {
            return this.maxq[0]
        }
    
        // 队头元素如果是 n，删除它
        pop(n) {
            if (n === this.maxq[0]) this.maxq.shift()
        }
    
    }

var maxSlidingWindow = function(nums, k) {
    const w = new MonotonicQueue
    const result = []
    for (let i = 0; i < nums.length; i++) {
        if (i < k - 1) {
            w.push(nums[i])
        } else {
            // 推入一个元素 的同时需要去掉一个元素
            w.push(nums[i])
            // 开始计算窗口最大值
            result.push(w.max())
            // 因为要保证只有 k 个元素 所以添加新元素后 移除最后的元素
            w.pop(nums[i - k + 1])
        }
    }
    return result
};

console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3))