class LRU2Map {

    constructor(length) {
        this.length = length
        // Map 的 添加删除有顺序
        this.data = new Map()
    }

    set (k, value) {
        const data = this.data
        if (data.has(k)) data.delete(k)
        data.set(k, value)
        // 超出容量 删掉最老的元素
        if (data.size > this.length) {
            data.delete(data.keys().next().value)
        }
    }
    
    get (k) {
        const data = this.data
        if (!data.has(k)) return
        const value = data.get(k)
        this.set(k, value)
        return value
    }

}

class LRU2Linked {
}

// Least Recently Used
var LRUCache = function(capacity) {
    this.capacity = capacity
    this.cache = new Map()
}

LRUCache.prototype.get = function(k) {
    // 非空
    if (!this.cache.has(k)) return -1
    // 换位置
    this.makeRecently(k)
    // 获取值
    return this.cache.get(k)
}

LRUCache.prototype.put = function(k, v) {
    // 如果之前被设置过 换位置
    if (this.cache.has(k)) {
        this.cache.set(k, v)
        this.makeRecently(k)
        return
    }
    // 判断缓存大小是否溢出
    if (this.cache.size >= this.capacity) {
        const oldest = this.cache.keys().next().value
        this.cache.delete(oldest)
    }
    // 设置新值
    this.cache.set(k, v)
}

LRUCache.prototype.makeRecently = function(k) {
    const value = this.cache.get(k)
    // 先删掉
    this.cache.delete(k)
    // 再添加
    this.cache.set(k, value)
}