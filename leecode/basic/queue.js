/**
 * 单调队列的实现
 * 单调递增 & 单调递减
 */

class MonotonicQueue {

    constructor () {
        this.maxq = []
    }

    // 在队尾添加元素 n
    push (n) {
        // 如果最后一个元素比n小 就推出去 只保留最大
        while (this.maxq.length && this.maxq[this.maxq.length - 1] < n) {
            this.maxq.pop()
        }
        this.maxq.push(n)
    }

    // 返回当前队列中的最大值
    max () {
        return this.maxq[0] || -1
    }

    min () {
        return this.maxq[this.maxq.length - 1] || -1
    }

    // 队头元素如果是 n，删除它
    pop(n) {
        if (n === this.maxq[0]) this.maxq.shift()
    }

}