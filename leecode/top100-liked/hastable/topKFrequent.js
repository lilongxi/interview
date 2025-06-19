/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
    // 统计元素词频
    const freqMap = {}
    for (const num of nums) freqMap[num] = (freqMap[num] || 0) + 1
    // 统计词频 + 对应元素
    const elements = []
    for (const num in freqMap) {
        elements.push({ element: num, frequency: freqMap[num] })
    }
    // 排序
    elements.sort((a, b) => a.frequency - b.frequency)
    // 截取K
    const result = []
    for (let i = 0; i < k; i++) {
        result.push(parseInt(elements[i].element)); // 将字符串转换为数字
    }
    return result
};

console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2))