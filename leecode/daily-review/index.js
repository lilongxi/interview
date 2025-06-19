const tw = function(nums, target) {
    const targetMap = nums.reduce((prev, curr, idx) => {
        Reflect.set(prev, curr, idx)
        return prev
    }, {})
   for (let i = 0; i < nums.length; i++) {
     const targetVal = target - nums[i]
     const idx = Reflect.get(targetMap, targetVal)
     if (Reflect.has(targetMap, targetVal) && idx !== i) {
        return [
            idx,
            i
        ]
     }
   }
   return [-1, -1]
}

const encode = function(s) {
    // [...s].sort.join
    const fill = new Array(26).fill(0)
    for(const char of s) {
        fill[char.charCodeAt() - 'a'.charCodeAt()]++
    }
    return fill.toString()
}

const groupAnagrams = function(strs) {
    const targetMap = new Map()
    for (let i = 0; i < strs.length; i++) {
        const code = encode(strs[i])
        if (!targetMap.has(code)) {
            targetMap.set(code, [strs[i]])
        } else {
            targetMap.get(code).push(strs[i])
        }
    }
    return [
        ...(targetMap.values())
    ]
}

const removeElement = function(nums, target) {
    let slow = 0, fast = 0
    // fast 相当于遍历每一个元素
    while (fast <= nums.length - 1) {
        // 把不等于 target 的元素向前挪动
        if (nums[fast] !== target) {
            nums[slow] = nums[fast]
            slow++
        }
        fast++
    }
    return slow
}

const moveZeroes = function(nums) {
    let index = removeElement(nums, 0)
    while (index < nums.length) {
        nums[index++] = 0
    }
    return nums
}

const Merge = function(left, right) {
    let lo = 0, ri = 0, i = 0
    const mergeArr = []
    while (lo < left.length && ri < right.length) {
        mergeArr[i++] = left[lo] < right[ri] ? left[lo++] : right[ri++]
    }
    while (lo < left.length) mergeArr[i++] = left[lo++]
    while (ri < right.length) mergeArr[i++] = right[ri++]
    return mergeArr
}

const MergeSort = function(arr = []) {
    if (arr.length <= 1) return arr
    const midd = Math.floor(arr.length / 2)
    const left = arr.slice(0, midd)
    const right = arr.slice(midd)
    return Merge(MergeSort(left), MergeSort(right))
}

const rotate = function(matrix) {
    const n = matrix.length
    for (let i = 0; i < n; i++) {
        for (let k = i; k < n; k++) {
            // 对角线做完
            const temp = matrix[i][k]
            matrix[i][k] = matrix[k][i]
            matrix[k][i] = temp
        }
    }
    // 行元素反转
    for (let i = 0; i < matrix.length; i++) {
    }
}


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

var combine = function(n, k) {
    const result = [], track = []
    const backtrack = function(start) {
        if (track.length === k) {
            result.push([...track])
            return
        }
        for (let i = start; i <= n; i++) {
            track.push(i)
            backtrack(i + 1)
            track.pop()
        }
    }
    backtrack(1)
    return result
}


// console.log(combine(4, 2))

const subsets = function(nums) {
    const result = [], track = []
    const backtrack = function(start) {
        result.push([...track])
        for (let i = start; i < nums.length; i++) {
            track.push(nums[i])
            backtrack(i + 1)
            track.pop()
        }
    }
    backtrack(0)
    return result
}

// [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
console.log(subsets([1,2,3]))

const letterCombinations = function(digits) {
    const digitsArr = [
        "", "",
        "abc",
        "def",
        "ghi",
        "jkl",
        "mno",
        "pqrs",
        "tuv",
        "wxyz"
    ]
    const result = [], track = []
    if (!digits.length) return result
    const backtrack = function(start) {
        if (digits.length === track.length) {
            result.push([...track].join(''))
            return
        }
        for (let i = start; i < digits.length; i++) {
            const digit = digits.charAt(i)
            const digitArr = digitsArr[digit]
            for (const cchar of digitArr) {
                track.push(cchar)
                backtrack(i + 1)
                track.pop()
            }
        }
    }
    backtrack(0)
    return result
}

console.log(letterCombinations("23"))

const generateParenthesis = function(n) {
    const result = []
    let trackPath = ''
    const backtrack = function(left, right) {
        if (right < left || left < 0 || right < 0) return
        if (right ===  0 && left === 0) {
            result.push(trackPath)
            return
        }

        trackPath += '('
        backtrack(left - 1, right)
        trackPath = trackPath.slice(0, -1)

        trackPath += ')'
        backtrack(left, right - 1)
        trackPath = trackPath.slice(0, -1)
    }
    backtrack(n, n)
    return result
}

console.log(generateParenthesis(3))

const isPalindrome = function(s, left, right) {
    while (left < right) {
        if (s[left++] !== s[right--]) return false
        return true
    }
}

const partition = function(s) {
    const result = [], track = []
    const backtrack = function(start) {
        if (start === s.length) {
            result.push([...track])
            return
        }
        for (let i = start; i < s.length; i++) {
            if (isPalindrome(s, start, i)) continue
            track.push(s.substring(start, i + 1))
            backtrack(i + 1)
            track.pop()
        }
    }
    backtrack(0)
    return result
}

const permute = function(nums) {
    const result = [], track = [], used = new Array(nums.length).fill(false)
    const backtrack = function() {
        if (nums.length === track.length) {
            result.push([...track])
            return
        }
        for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue
            track.push(nums[i])
            used[i] = true
            backtrack()
            track.pop()
            used[i] = false
        }
    }
    backtrack()
    return result
}

console.log(permute([1,2,3]))

// left_bound
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
    // if (left <= 0 || nums[left] !== target) return -1
    return left
}

const searchMatrix = function(matrix, target) {
    
}