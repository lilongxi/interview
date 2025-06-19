// const merge = function(nums1, m, nums2, n) {
//     const mergeArr = []
//     let p1 = 0, p2 = 0, p = 0;
//     while (p1 < m && p2 < n) {
//         mergeArr[p++] = nums1[p1] < nums2[p2] ? nums1[p1++] : nums2[p2++]
//     }
//     while (p1 < m) mergeArr[p++] = nums1[p1++]
//     while (p2 < n) mergeArr[p++] = nums2[p2++]
//     return mergeArr
// }

// console.log(merge([1,2,3,0,0,0], 3, [2,5,6], 3))

const merge = function(nums1, m, nums2, n) {
    let i = m - 1, j = n - 1, k = m + n - 1
    while (i >=0 && j >= 0) {
        nums1[k--] = nums1[i] < nums2[j] ? nums2[j--] : nums1[i--]
    }
    // while(i >= 0) nums1[k--] = nums1[i--]
    while(j >= 0) nums1[k--] = nums2[j--]
}

const removeElements = function(nums, val) {
    let slow = 0, fast = 0
    while (fast < nums.length) {
        if (nums[fast] !== val) {
            nums[slow] = nums[fast]
            slow++
        }
        fast++
    }
    return slow
}

const removeDuplicates = function(nums) {
    let slow = 0, fast = 0
    while (fast < nums.length) {
        if (nums[slow] !== nums[fast]) {
            nums[slow] = nums[fast]
            slow++
        }
        fast++
    }
    return slow + 1
}

const majorityElement = function(nums) {
    return nums.sort((a, b) => a -b)[nums.length >> 1]
}

const rotate = function(nums, k) {
    k %= nums.length
    const rotateResverse = function(arr, start, end) {
        while (start < end) {
            [arr[start], arr[end]] = [arr[end], arr[start]]
            start++
            end--
        }
        return arr
    }
    rotateResverse(nums, 0 , nums.length - 1)
    rotateResverse(nums, 0 , k - 1)
    rotateResverse(nums, k , nums.length - 1)
}

const maxProfit = function(prices) {
    const n = prices.length
    const dp = Array.from({ length: n }, () => new Array(2).fill(0))
    dp[0][0] = 0 // 不买也不卖
    dp[0][1] = -prices[0] // 卖股票
    for (let i = 1; i < n; i++) {
        // 维持第一天不卖也不买 或者 卖掉
        dp[i][0] = Math.max(dp[i - 1][0], dp[i-1][1] + prices[i])
        dp[i][1] = Math.max(dp[i - 1][1],  -prices[i])
    }
}

const maxProfitII = function(prices) {
    const n = prices.length
    const dp = Array.from({ length: n }, () => new Array(2).fill(0))
    dp[0][0] = 0
    dp[0][1] = -prices[0]
    for (let i = 1; i < n; i++) {
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i])
        dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i])
    }
}

// maxProfit([7,1,5,3,6,4])

const canJump = function(nums) {
    const n = nums.length
    let farthest = 0
    for (let i = 0; i < n - 1; i++) {
        farthest = Math.max(farthest, nums[i] + i)
        console.log('farthest', farthest, i)
        //
        if (farthest <= i) return false
    }
    return farthest >= n - 1
}

const canJump2 = function(nums) {
    const n = nums.length
    let farthest = 0, end = 0, c = 0
    for (let i = 0; i < n; i++) {
        farthest = Math.max(farthest, nums[i] + i)
        // 证明可以跳到最后
        if (end === i) {
            c++
            end = farthest
        }
    }
    return c
}

const longestCommonPrefix = function(strs) {
}

// console.log(canJump([2,3,1,1,4]))

const twoSum = function(numbers, target) {
    let left = 0, right = numbers.length - 1
    while (left < right) {
        const total = numbers[left] + numbers[right]
        if (total === target) {
            return [left + 1, right + 1]
        } else if (total < target) {
            left++
        } else {
            right--
        }
    }
    return [-1, -1]
}

const maxArea = function(heights = []) {
    let left = 0, right = heights.length - 1, maxArea = 0
    while (left < right) {
        const currentArea = (right - left) * Math.min(heights[left], heights[right])
        maxArea = Math.max(maxArea, currentArea)
        if (heights[left] < heights[right]) {
            left++
        } else {
            right--
        }
    }
    return maxArea
}

const lengthOfLongestSubstring = function(s) {
    const w = {}
    let left = 0, right = 0, result = 0
    while (right < s.length) {
        const c1 = s[right++]
        w[c1] = (w[c1] || 0) + 1
        while (w[c1] > 1) {
            const c2 = s[left++]
            w[c2]--
        }
        result = Math.max(result, right - left)
    }
    return result
}

const minWindow = function(s, t) {
    const w = {}, need = {}
    for (const char of t) need[char] = (need[char] || 0) + 1
    let left = 0, right = 0, valid = 0, min = Number.MAX_SAFE_INTEGER, start = 0
    const needLength = Object.keys(need).length
    while (right < s.length) {
        const c1 = s[right++]
        w[c1] = (w[c1] || 0) + 1
        if (w[c1] === need[c1]) valid++
        while (needLength === valid) {
            if (right - left < min) {
                start = left
                min = right - left
            }
            const c2 = s[left++]
            if (w[c2] === need[c2]) valid--
            w[c2]--
        }
    }
    return min < Number.MAX_SAFE_INTEGER ? s.substring(start, start + min) : ''
}


const trap = function(heights) {
    let maxArea = 0
    for (let i = 0; i < heights.length - 1; i++) {
        let left_max = 0, right_max = 0
        for (let i1 = i; i1 < heights.length; i1++) {
            right_max = Math.max(right_max, heights[i1])
        }
        for (let i2 = i; i2 >= 0; i2--) {
            left_max = Math.max(left_max, heights[i2])
        }
        maxArea += Math.min(left_max, right_max) - heights[i]
    }
    return maxArea
}


const spiralOrder = function(matrix) {
    let top = 0, right = matrix[0].length - 1, bottom = matrix.length - 1, left = 0
    const result = []
    let i
    while (left <= right && top <= bottom) {
        for (i = left; i <= right; i++) result.push(matrix[top][i])
        top++
        for (i = top; i <= bottom; i++) result.push(matrix[i][right])
        right--
        if (top > bottom || left > right) break
        for(i = right; i >= left; i--) result.push(matrix[bottom][i])
        bottom--
    }
}


const rotateMatrix = function(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        for (let i2 = i; i2 < matrix[0].length; i2++) {
            // const temp = matrix[i][i2]
            // matrix[i][i2] = matrix[i2][i]
            // matrix[i2][i] = temp
            [matrix[i][i2], matrix[i2][i]] = [matrix[i2][i], matrix[i][i2]]
        }
    }
    for (const r of matrix) reverse(r)
    function reverse(arr) {
        let left = 0, right = arr.length - 1
        while (left < right) {
            [arr[left], arr[right]] = [arr[right], arr[left]]
            left++
            right--
        }
    }
    return matrix
}

// console.log(rotateMatrix([[1,2,3],[4,5,6],[7,8,9]]))

const setZeroes = function(matrix) {
    const row = new Array(matrix.length).fill(false)
    const col = new Array(matrix[0].length).fill(false)
    for (let i = 0; i < matrix.length; i++) {
        for (let k = 0; k < matrix[0].length; k++) {
            if (matrix[i][k] === 0) {
                row[i] = col[k] = true
            }
        }
    }
    for (let i = 0; i < matrix.length; i++) {
        for (let k = 0; k < matrix[0].length; k++) {
           if (row[i] || col[k]) matrix[row][col] = 0
        }
    }
    return matrix
}


const groupAnagrams = function(strs) {
    const target = new Map
    for (const str of strs) {
        const code = encode(str)
        if (target.has(code)) {
            target.get(code).push(str)
        } else {
            target.set(code, [str])
        }
    }
    function encode(s) {
        const fill = new Array(26).fill(0)
        for(const char of s) {
            fill[char.charCodeAt() - 'a'.charCodeAt()]++
        }
        return fill.toString()
    }
    return [
        ...target.values()
    ]
}

// console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))

const tw = function(nums, target) { 
}

const longestConsecutive = function(nums) {
    nums = nums.sort((a, b) => a - b)
    let longest = 1, c = 1
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === nums[i + 1]) continue
        c = (nums[i] + 1 === nums[i + 1]) ? c++ : 1
        longest = Math.max(longest, c)
    }
    return longest
}

const mergeIntervals = function(intervals = []) {
    const result = []
    intervals = intervals.sort((a, b) => a[0] - b[0])
    let first = intervals[0]
    for (let i = 1; i < intervals.length; i++) {
        const second = intervals[i]
        if (first[1] >= second[0]) {
            first[1] = Math.max(first[1], second[1])
        } else {
            result.push(first)
            first = second
        }
    }
    result.push(first)
    return result
}


const letterCombinations = function(digits) {
    const mapping = ["", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];
    const result = [], track = []
    const backtrack = function(start) {
        if (track.length === digits.length) {
            result.push([...track].join(''))
            return
        }
        for (let i = start; i < digits.length; i++) {
            const digit = digits[i]
            for (const c of mapping[digit]) {
                track.push(c)
                backtrack(i + 1)
                track.pop()
            }
        }
    }
    backtrack(0)
    return result
}

const numIslands = function(grid) {
    let result = 0
    const helper = function(row, col) {
        if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length || grid[row][col] === 0) return
        grid[row][col] = 0
        // helper(row - 1, col)
    }
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            if (grid[r][c] == 1) {
                result++
                helper(r, c)
            }
        }
    }
}

const checkInclusion = function(s1, s2) {
    const w = {}, need = {}
    for (const c of s1) need[c] = (need[c] || 0) + 1
    let left = 0, right = 0, valid = 0
    const needLength = Object.keys(need).length
    while (right < s2.length) {
        const c1 = s2[right++]
        w[c1] = (w[c1] || 0) + 1
        if (w[c1] === need[c1]) valid++
        while (right - left >= s1.length) {
            if (valid === needLength) return true
            const c2 = s2[left++]
            if (w[c2] === need[c2]) valid--
            w[c2]--
        }
    }
}


class Trie {

    constructor () {
        this.children = {}
    }

    insert (word) {
        let c = this.children
        for (const char of word) {
            if (!c[char]) c[char] = {}
            c = c[char]
        }
        c.end = true
    }

    searchPrefix (word) {
        let c = this.children
        for (const char of word) {
            if (c[char]) {
                c = c[char]
            } else {
                return false
            }
        }
        return c
    }

    search (word) {
        const c = this.searchPrefix(word)
        return c !== undefined && c.end !== undefined
    }

    startsWith (word) {
        return this.searchPrefix(word)
    }

}

const combine = function(n, k) {
    const result = [], track = []
    const backtrack = function(i) {
        if (k === track.length) {
            result.push([...track])
            return
        }
        for (let k = i; k <= n; k++) {
            track.push(k)
            backtrack(i + 1)
            track.pop()
        }
    }
    backtrack(1)
    return result
}

const hasCycle = function (h) {

    // if (!h || !h.next) return false
    // while (h) {
    //     if (h.v) return true
    //     h.v = true
    //     h = h.next
    // }
    // return false

    const slow = h.next, fast = h.next.next
    while (slow !== fast) {
        if (!fast || !fast.next) return false
        slow = slow.next
        fast = fast.next.next
    }
    return true

}

const maxSubArray = function(nums) {
    const length = nums.length
    const dp = new Array(length).fill(0)
    dp[0] = nums[0]
    for (let i = 1; i < length; i++) {
        dp[i] = Math.max(nums[i], dp[i - 1] + nums[i])
    }
    return Math.max(...dp)
}

const permute = function(nums) {
    const result = [], track = [], used = {}
    const backtrack = function() {
        if (track.length === nums.length) {
            result.push([...track])
            return
        }
        for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue
            track.push(nums[i])
            used[i] = true
            backtrack()
            used[i] = false
            track.pop()
        }
    }
    backtrack()
    return result
}

const climbStairs = function(n) {
    if (n <= 2) return n
    const memo = new Array(n + 1).fill(0)
    const helper = function(steps) { 
        if (steps <= 2) return steps
        return helper(steps - 1) + helper(steps - 2)
    }
    return helper(n)
}

// 数字组合是可以重复的
const combinationSum = function(candidates, target) {
    const result = [], track = []
    const backtrack = function(start, totalSum) {
        if (totalSum === target) {
            result.push([...track])
            return
        }
        if (totalSum > target) return
        for (let i = start; i < candidates.length; i++) {
            track.push(candidates[i])
            totalSum += candidates[i]
            backtrack(i, totalSum)
            totalSum -= candidates[i]
            track.pop()
        }
    }
    backtrack(0, 0)
    return result
}

const generateParenthesis = function(n) {
    const result = []
    let trackPath = ''
    const backtrack = function(left, right, trackPath) {
        if (right < left || left < 0 || right < 0) return
        if (left === 0 && right === 0) {
            result.push(trackPath)
            return
        }
        trackPath += '('
        backtrack(left - 1, right, trackPath)
        trackPath = trackPath.slice(0, -1)

        trackPath += ')'
        backtrack(left, right - 1, trackPath)
        trackPath = trackPath.slice(0, -1)
    }
    backtrack(0, 0, trackPath)
    return result
}


const addTwoNumbers = function(l1, l2) {
    let node = new ListNode(-1), add = 0
    const head = node
    while (add || l1 || l2) {
        const total = ((l1.val || 0) + (l2.val || 0)) + add
        add = total >= 10 ? 1 : 0
        node.next = new ListNode(total % 10)
        node = node.next
        if (l1) l1 = l1.next
        if (l2) l2 = l2.next
    }
    return head.next
}

const mergeTwoLists = function(list1, list2) {
    if (list1) return list2
    if (list2) return list1
    if (list1.val < list2.val) {
        list1.next = mergeTwoLists(list1.next, list2)
        return list1
    } else {
        list2.next = mergeTwoLists(list1, list2.next)
        return list2
    }
}

const searchInsert = function(nums, target) {
    let left = 0, right = nums.length - 1
    while (left <= right) {
        const midd = (left + right) >> 1
        if (nums[midd] === target) {
            right = midd - 1
        } else if (nums[midd] > target) {
            right = midd - 1
        } else if (nums[midd] < target) {
            left = midd + 1
        }
    }
    return left
}

function encodeChar(s) {
    const fillChar = new Array(26).fill(0)
    for (const char of s) fillChar[char.charCodeAt() - 'a'.charCodeAt()]++
    return fillChar.toString()
}