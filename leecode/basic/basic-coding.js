/**
 * 
 * part2 算法
 * 1. 数组
 * 2. 双指针
 * 3. 回溯
 * 4. 二分
 * 5. 二叉树
 * 6. 链表
 * 7. 动态规划
 * 8. 滑动窗口
 * 9. 栈
 * 10. 散列表
 */

const tw = function(nums = [], target) {
    const targetMap = nums.reduce((prev, curr, idx) => {
        Reflect.set(prev, curr, idx)
        return prev
    }, {})
    for (let i = 0; i < nums.length; i++) {
        const targetVal = target - nums[i]
        const idx = Reflect.get(targetMap, targetVal)
        if (idx && idx !== i) return [ idx, i ]
    }
    return [-1, -1]
}

/**
 * @param {*} strs 
 * Map + encode
 */

const encode = function(str) {
    const chill = new Array(26).fill(0)
    for (const c of str) chill[c.charCodeAt() - 'a'.charCodeAt()]++
    return chill.toString()
}

const groupAnagrams = function(strs) {
    const targetMap = new Map
    for (const char of strs) {
        const encodeChar = encode(char)
        const hChar = targetMap.has(encodeChar)
        if (hChar) {
            targetMap.get(encodeChar).push(char)
        } else {
            targetMap.set(encodeChar, [char])
        }
    }
    return [...targetMap.values()]
}

const longestConsecutive = function(nums) {
    nums = nums.sort((a, b) => a - b)
    let longest = 1, c = 1
    for (let i = 0; i < nums.length - 1; i++) {
        if (nums[i] === nums[i + 1]) continue
        c = nums[i] + 1 === nums[i + 1] ? c++ : 1 
        longest = Math.max(longest, c)
    }
    return longest
}

const removeElements = function(nums, target) {
    let slow = 0, fast = 0
    while (fast < nums.length) {
        if (nums[fast] !== target) {
            nums[slow] = nums[fast]
            slow++
        }
        fast++
    }
    return slow
}

const moveZeroes = function(nums) {
    let p = removeElements(nums, 0)
    while (p < nums.length) nums[p++] = 0
    return nums
}

// console.log(moveZeroes([0,1,0,3,12]))

const maxArea = function (height) {
    let left = 0, right = height.length - 1
    let max = 0
    while (left < right) {
        const currentArea = (right - left) * Math.min(height[left], height[right])
        max = Math.max(max, currentArea)
        if (height[left] < height[right]) {
            left++
        } else {
            right--
        }
    }
    return max
}

const twoSumPoint = function(nums, start = 0, target) {
    nums = nums.sort((a, b) => a - b)
    let left = start, right = nums.length - 1
    const targetArr = []
    while (left < right) {
        const lval = nums[left]
        const rval = nums[right]
        const total = lval + rval
        if (total === target) {
            targetArr.push([lval, rval])
            while (left < right && nums[left] === lval) left++
            while (left < right && nums[right] === rval) right--
        } else if (total < target) {
            while (left < right && nums[left] === lval) left++
        } else {
            while (left < right && nums[right] === rval) right--
        }
    }
}

const trap = function(height) {
    let maxArea = 0
    for (let i = 0; i < height.length - 1; i++) {
        let right_max = 0, left_max = 0
        for (let ri = i; ri < height.length; ri++) {
            right_max = Math.max(right_max, height[ri])
        }
        for (let li = i; li >= 0; li++) {
            left_max = Math.max(left_max, height[li])
        }
        maxArea += Math.min(left_max, right_max) - height[i]
    }
    return maxArea
}


const lengthOfLongestSubstring = function(s) {
    const w = {}
    let left = 0, right = 0, result = 0
    while (left < s.length) {
        const c = s[right++]
        w[c] ? w[c]++ : (w[c] = 1)
        // 字符出现重复
        if (w[c] > 1) {
            const c1 = s[left++]
            w[c1]--
        }
        result = Math.max(result, right - left)
    }
    return result
}

const subarraySum = function(nums, k) {
    let c = 0
    for (let end = 0; end < nums.length; end++) {
        let total = 0
        for (let start = end; start >= 0; start--) {
            total += nums[start]
            if (total === k) c++
        }
    }
    return c
}


class MonotonicQueue {
    constructor() {
        this.q = []
    }
    push (n) {
        while (this.q.length && this.q[this.q.length - 1] < n) this.q.pop()
        this.q.push(n)
    }

    max () {
        return this.q[0]
    }

    pop (n) {
        if (n === this.q.length[0]) this.q.shift()
    }
}

const maxSlidingWindow = function(nums, k) {
    const w = new MonotonicQueue
    const result = []
    for (let i = 0; i < nums.length; i++) {
        if (i < k - 1) {
            w.push(nums[i])
        } else {
            w.push(nums[i])
            result.push(w.max())
            w.pop(nums[i - k + 1])
        }
    }
}

const maxSubArray = function(nums) {
    const length = nums.length
    const dp = new Array(length).fill(0)
    dp[0] = nums[0]
    for (let i = 1; i < length; i++) {
        dp[i] = Math.max(nums[i], nums[i] + dp[i - 1])
    }
    return Math.max(...dp)
}

const merge = function(intervals = []) {
    const target = []
    intervals.sort((a, b) => a[0] - b[0])
    let prev = intervals[0]
    for (let i = 1; i < intervals.length; i++) {
        const curr = intervals[i]
        if (prev[1] >= curr[0]) {
            prev[1] = Math.max(prev[1], curr[1])
        } else {
            target.push(prev)
            prev = curr
        }
    }
    target.push(prev)
    return target
}

const maxProfit = function(prices) {
    const n = prices.length
    const dp = Array.from({ length: n }, () => new Array(2).fill(0))
    dp[0][0] = 0
    dp[0][1] = -prices[0]
    for (let i = 1; i < n; i++) {
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i])
        dp[i][1] = Math.max(dp[i - 1][1], -prices[i])
    }
    return dp[n - 1][0]
}

const canJump = function(nums) {
    const n = nums.length
    let farthest = 0
    for (let i = 0; i < n - 1; i++) {
        farthest = Math.max(farthest, nums[i] + 1)
        if (farthest <= i) return false
    }
    return farthest >= n - 1
}

const rob = function(nums) {
    const n = nums.length
    const dp = new Array(n + 2).fill(0)
    for (let i = n - 1; i >= 0; i--) {
        dp[i] = Math.max(dp[i + 1], dp[i + 2] + nums[i])
    }
    return dp[0]
}

const maxProduct = function(nums) {
    const n = nums.length
    const dpMax = new Array(n), dpMin = new Array(n)
    dpMax[0] = nums[0]
    dpMin[0] = nums[0]
    for (let i = 1; i < n; i++) {
        dpMax[i] = Math.min(dpMin[i-1] * nums[i], nums[i], dpMax[i-1] * nums[i])
        dpMin[i] = Math.max(dpMin[i-1] * nums[i], nums[i], dpMax[i-1] * nums[i])
    }
    return Math.max(...dpMax)
}

const leftOf = char => {
    if (char === '}') return '{'
    if (char === ']') return '['
    if (char === ')') return '('
}

const isValid = function(s) {
    if (!s.length) return true
    const stk = []
    for (const char of s) {
        if (['{', '[', '('].includes(char)) {
            stk.push(char)
        } else {
            if (!stk.length || leftOf(char) !== stk[stk.length - 1]) return false
            stk.pop()
        }
    }
    return !stk.length
}


const maxArea2 = function(heights = []) {
    let left = 0, right = heights.length - 1
    let maxArea = 0
    while (left <= right) {
        const currentArea = (right - left) * Math.min(heights[left], heights[right])
        maxArea = Math.max(currentArea, maxArea)
        if (heights[left] < heights[right]) {
            left++
        } else {
            right--
        }
    }
}

const trap2 = function(heights = []) {
    const length = heights.length
    let maxArea
    for (let i = 0; i < length - 1; i++) {
        let leftMax = 0, rightMax = 0
        for (let start = i; start < length; start++) {
            leftMax = Math.max(leftMax, heights[start])
        }
        for (let end = i; end >=0; end--) {
            rightMax = Math.max(rightMax, heights[end])
        }
        maxArea += Math.min(leftMax, rightMax) - heights[i]
    }
    return maxArea
}

// 使用 双指针维护一个 动态变化的 区间
const lengthOfLongestSubstring2 = function(s) {
    const w = {}
    let left = 0, right = 0, result = 0
    while (right < s.length) {
        const c1 = s[right++]
        // 记录词频
        w[c1] = (w[c1] || 0) + 1
        // 窗口出现重复单词
        while (w[c1] > 1) {
            const c2 = s[left++]
            if (w[c2]) w[c2]--
        }
        // 跳出内循环的时候 证明窗口已经没有重复的单词了 视为一个无重复子串
        result = Math.max(result, right - left)
    }
    return result
}

/**
 * 
 * @param {*} s 长串
 * @param {*} t 小串
 * 
 */
const minWindow = function(s, t) {
    const w = {}, need = {}
    for (const char of t) need[char] = (need[char] || 0) + 1
    // 区间变量
    let left = 0, right = 0, sl = s.length, c = 0, min = Number.MAX_SAFE_INTEGER, start = 0
    const needLength = Object.keys(need).length
    while (right < sl) {
        const c1 = s[right++]
        w[c1] = (w[c1] || 0) + 1
        // 比较两个窗口的词频
        if (w[c1] === need[c1]) c++
        // 缩小窗口的条件 s串的窗口长度 等于 小串的长度
        while (needLength === c) {
            // 找最小
            if (right - left < min) {
                // 记录左侧起点
                start = left
                // 左侧起点 + min 就是子串长度
                min = right - left
            }
            const c2 = s[left++]
            if (w[c2] === need[c2]) c--
            w[c2]--
        }
    }
    return min < Number.MAX_SAFE_INTEGER ? s.substring(start, start + min) : ''
} 

const findAnagrams = function(s, p) {
    const w = {}, need = {}, result = []
    for (const char of p) need[char] = (need[char] || 0) + 1
    let left = 0 ,right = 0, length = s.length, c = 0, needLength = Object.keys(need).length
    while (right < length) {
        const c1 = s[right++]
        w[c1] = (w[c1] || 0) + 1
        if (w[c1] === need[c1]) c++
        while (right - left >= p.length) {
            if (c === needLength) {
                result.push(left)
            }
            const c2 = s[left++]
            if (w[c2] === need[c2]) c--
            w[c2]--
        }
    }
    return result
}

const mergeIntervals = function(intervals = []) {
    const result = []
    intervals = intervals.sort((a, b) => a[0] - b[0])
    let prev = intervals[0]
    for (let i = 1; i < intervals.length; i++) {
        const curr = intervals[i]
       // 区间重叠 获取两个最大的一个
       if (prev[1] >= curr[0]) {
          prev[1] = Math.max(curr[1], prev[1])
       } else {
          result.push(prev)
          prev = curr
       }
    }
    result.push(prev)
    return result
}

const reverse = function(nums, start, end) {
    while (start <= end) {
        [nums[start], nums[end]] = [nums[end], nums[start]]
        start++
        end--
    }
    return nums
}

const rotateArr = function(nums, k) {
    k %= nums.length
    reverse(nums, 0, nums.length - 1)
    reverse(nums, 0, k - 1)
    reverse(nums, k, nums.length -1)
}


const setZeroes = function(matrix = []) {
    const m = matrix.length, n = matrix[0].length
    const row = new Array(m).fill(false)
    const col = new Array(n).fill(false)
    for (let i = 0; i < m; i++) {
        for (let k = 0; k < n; k++) {
            if (matrix[i][k] === 0) {
                row[i] = col[k] = true
            }
        }
    }
    for (let i = 0; i < m; i++) {
        for (let k = 0; k < n; k++) {
            if (row[i] || col[k]) {
                matrix[i][k] = 0
            }
        }
    }
    return matrix
}

/**
 * 
 * @param {*} matrix 
 * 上下左右的遍历过程
 */
const spiralOrder = function(matrix = []) {
    let top = 0, right = matrix[0].length - 1, bottom = matrix.length - 1, left = 0
}

const permute = function(nums) {
    const result = [], tack = [], used = new Array(nums.length - 1).fill(false)
    const backtrack = function() {

        // base case
        if (tack.length === nums.length) {
            result.push([...tack])
            return
        }

        for (let i = 0; i < nums.length; i++) {

            if (used[i]) continue

            used[i] = true
            tack.push(nums[i])

            backtrack(i + 1)

            tack.pop()
            used[i] = false

        }

    }
    backtrack()
    return result
}


const subsets = function(nums) {
    const result = [], tack = []
    const backtrack = function(i) {
        result.push([...tack])
        for (let start = i; start < nums.length; start++) {
            tack.push(nums[start])
            backtrack(start + 1)
            tack.pop()
        }
    }
    backtrack(0)
    return result
}

const letterCombinations = function(digits) {
    const digitsArr = [
        '', '',  "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];
    const result = [], tack = []
    const backtrack = function(start) {
        // base case
        if (tack.length === digits.length) {
            result.push([...tack].join(''))
            return
        }
        // 循环递进的条件 和 base case 有关
        for (let i = start; i < digits.length; i++) {
            const digit = digits[i]
            for (const char of digitsArr[digit]) {
                tack.push(char)
                backtrack(i + 1)
                tack.pop()
            }
        }
    }
    backtrack(0)
    return result
}


const combinationSum  = function(candidates, target) {
    const result = [], tack = []
    const backtrack = function(start, total) {
        if (total === target) {
            result.push([...tack])
            return
        }
        if (total > target) return
        for (let i = start; i < candidates.length; i++) {
            total += candidates[i]
            tack.push(candidates[i])
            backtrack(i, total)
            tack.pop()
            total -= candidates[i]
        }
    }
    backtrack(0, 0)
    return result
}

const searchInsert = function(nums, target) {
    let left = 0, right = nums.length - 1
    while (left <= right) {
        const midd = (left + right) >> 1
        if (nums[midd] === target) {
            right = midd -1
        } else if (nums[midd] > target) {
            right = midd - 1
        } else if (nums[midd] < target) {
            left = midd + 1
        }
    }
    return left
}

// console.log(searchInsert([1,3,5,6], 5))

const numIslands = function(grid) {
    let result = 0, maxArea = 0

    const helper = function(row, col) {
        let maxValue = 0
        // base case: grid[row][col] = 0
        if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length || grid[row][col] === 0) return maxValue
        grid[row][col] = 0
        maxValue++
        maxValue += helper(row + 1, col)
        maxValue += helper(row - 1, col)
        maxValue += helper(row, col + 1)
        maxValue += helper(row, col - 1)
        return maxValue
    }

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            if (grid[row][col] === 1) {
                result++
                const v = helper(row, col)
                maxArea = Math.max(maxArea, v)
            }
        }
    }

    return {result, maxArea}
}


class Trie {

    constructor() {
        this.children = {}
    }
    
    insert(word) {
        let c = this.children
        for (const char of word) {
            if (!c[char]) c[char] = {}
            c = c[char]
        }
        c.isEnded = true
    }

    searchPrefix(prefix) {
        let c = this.children
        for (const char of prefix) {
            if (c[char]) {
                c = c[char]
            } else {
                return false
            }
        }
        return c
    }

    search(word) {
        const node = this.searchPrefix(word)
        return node !== undefined && node.isEnded !== undefined
    }

    startsWith(word) {
        return this.searchPrefix(word)
    }

}

const trie = new Trie;
trie.insert("apple");

// console.log(trie)


const uniquePaths = function(m, n) {
    // 初始化 横向 + 纵向 都为1
    const dp = Array.from({ length: n }, () => new Array(m).fill(0))
    for (let row = 0; row < n; row++) {
        dp[row][0] = 1
    }
    for (let col = 0; col < m; col++) {
        dp[0][col] = 1
    }
    for (let row = 1; row < n; row++) {
        for(let col = 1; col < m; col++) {
            dp[row][col] = dp[row - 1][col] + dp[row][col - 1]
        }
    }
    console.log(dp)
}

// console.log(uniquePaths(3, 7))

const generateParenthesis = function(n) {
    if (!n) return []
    const result = []
    let tackPath = ''
    const backtrack = function(left, right, tackPath) {
        // base case
        if (left > right || left < 0 || right < 0) return
        if (left === 0 && right === 0) {
            result.push(tackPath)
            return
        }

        tackPath += '('
        backtrack(left - 1, right, tackPath)
        tackPath = tackPath.slice(0, -1)

        tackPath += ')'
        backtrack(left, right - 1, tackPath)
        tackPath = tackPath.slice(0, -1)

    }
    backtrack(n, n, tackPath)
    return result
}

// console.log(generateParenthesis(3))

const combine = function(n, k) {
    const result = [], tack = []
    const backtrack = function(start) {
        if (k === tack.length) {
            result.push([...tack])
            return
        }
        for (let i = start; i <= n; i++) {
            tack.push(i)
            backtrack(i + 1)
            tack.pop()
        }
    }
    backtrack(1)
    return result
}
