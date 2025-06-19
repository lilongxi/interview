/**
 * part1 基础数据结构
 * 1. 排序
 * 2. LRU
 * 3. 队列 实现 栈
 * 4. 单调队列 单调栈
 * 
 */

const LRUCache = function(capacity) {
    this.capacity = capacity
    this.cache = new Map
}

LRUCache.prototype.get = function(k) {
    if (!this.cache.has(k)) return -1
    this.makeRecently(k)
    this.cache.get(k)
}

LRUCache.prototype.put = function(k, v) {
    if (this.cache.has(k)) {
        this.cache.set(k, v)
        this.makeRecently(k)
        return
    }
    if (this.cache.size >= this.capacity) {
        const oldest = this.cache.keys().next().value
        this.cache.delete(oldest)
    }
    this.cache.set(k, v)
}

LRUCache.prototype.makeRecently = function (k) {
    const v = this.cache.get(k)
    this.cache.delete(k)
    this.cache.set(k, v)
}

function Merge(a1, a2) {
    let p1 = 0, p2 = 0, p = 0
    const mergeArr = []
    while (p1 < a1.length && p2 < a2.length) {
        mergeArr[p++] = a1[p1] < a2[p2] ? a1[p1++] : a2[p2++]
    }
    while (p1 < a1.length) mergeArr[p++] = a1[p1++]
    while (p2 < a2.length) mergeArr[p++] = a2[p2++]
    return mergeArr
}

function MergeSort(arr = []) {
    if (arr.length <= 1) return arr
    const pivotIdx = Math.floor(arr.length / 2)
    const left = arr.slice(0, pivotIdx)
    const right = arr.slice(pivotIdx, arr.length)
    return Merge(MergeSort(left), MergeSort(right))
}

function QuickSort(arr = []) {
    if (arr.length <= 1) return arr
    const pivotIdx = (arr.length / 2) >> 1
    const pivotNum = arr.slice(pivotIdx, 1)[0]
    const left = [], right = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < pivotNum) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    return QuickSort(left).concat(pivotNum, ...QuickSort(right))
}


class MonotonicQueue {

    constructor() {
        this.q = []
    }

    push (n) {
        while (this.q.length && this.q[this.q.length - 1] < n) {
            this.q.pop()
        }
        this.q.push(n)
    }

    max () {
        return this.q[0]
    }

    pop (n) {
        if (n === this.q[0]) this.q.shift()
    }

}

const mq = new MonotonicQueue

mq.push(1)
mq.push(2)
mq.push(30)
mq.push(100)
mq.push(101)
mq.push(101000)

console.log(mq.q)
