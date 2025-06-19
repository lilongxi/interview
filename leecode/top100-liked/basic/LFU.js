
// Least Frequently Used
var LFU = function(capacity) {
    this.capacity = capacity
    this.cache = new Map
    this.freqMap = new Map // 存储访问频率的哈希表
    this.minFreq= 0
}

LFU.prototype.get = function(key) {
    if (!this.cache.has(key)) return -1
    // 更新访问频率
    const [ value, freq ] = this.cache.get(key)
    this.cache.set(key, [ value, freq + 1 ])
    this.freqMap.set(key, freq + 1)
    if (freq === this.minFreq && !this.freqMap.has(freq + 1)) {
        this.minFreq++
    }
    return value
}

LFU.prototype.put = function(key, value) {
    if (this.capacity === 0) return
    // 如果超出容量 把移除频率最低的
    if (this.cache.size >= this.capacity) this.makeFreqently()
    this.cache.set(key, [value, 1])
    this.freqMap.set(key, 1)
    this.minFreq = 1
}

LFU.prototype.makeFreqently = function() {
    const keys = this.freqMap.keys()
    let freqKey = null

    // 找到访问频率最低的元素
    for (const key of keys) {
        if (!freqKey || this.freqMap.get(key) < this.freqMap.get(freqKey)) {
            freqKey = key
        }
    }

    this.cache.delete(freqKey)
    this.freqMap.delete(freqKey)

}