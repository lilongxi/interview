function backtrack() {
    const result = []
    const helper = function(path, track) {
        // 满足条件 结束递归
        if (condition) {
            result.push(path)
            return
        }
        // 循环体的条件 也就是层级 永远和 base case的终止条件有关系
        for (const i in track) {
            // 做选择
            track.push()
            // helper(路径, 选择列表)
            // 撤销选择 因为要还原数据
            track.pop()
        }
    }
}

/**
 * 排列：顺序 比如 1，2，3 和 1，3，2
 * 组合：元素不同才行 比如 1，2 和 2，1 不算
 * 子集：属于组合的一种 (不在乎元素的顺序)
 * 
 * 形式一：元素无重不可复选 nums 中的元素都是唯一 每个元素只能被使用一次
 * 形式二：元素可重不可复选 nums 中的元素可以存在重复 每个元素最多只能被使用一次
 * 形式三：元素无重可复选 即 nums 中的元素都是唯一 每个元素就可以被使用若干次
 */