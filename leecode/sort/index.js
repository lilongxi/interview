/**
 * Bubble sort
 * Insertion sort
 * Merge sort
 * Quick sort
 * Heap sort
 * Bucket sort
 */

function swap(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]]
}

// 经过每一轮排序后 数组后端的数是排好的
function Bubble(arr = []) {
    let hasChange = true
    for (let i = 0; i < arr.length - 1; i++) {
        hasChange = false
        for (let k = 0; k < arr.length - 1 - i; k++) {
            if (arr[k] > arr[k + 1]) {
                swap(arr,k, k + 1)
                hasChange = true
            }
        }
    }
    return arr
}

/**
 * 经过每一轮后 数组前端的数是排好的
 */
function Insertion(arr = []) {
    // 默认第一个元素是排好序的
    for(let i = 1, j; i < arr.length; i++) {
        const curr = arr[i]
        // 从第二个元素开始 和 第一个比较后
        for (j = i - 1; j >= 0 && arr[j] > curr; j--) {
            // 如果后一个比前一个大 交换位置
            arr[j + 1] = arr[j]
        }
        arr[j + 1] = curr
    }
    return arr
}

// nlogn
function Merge(a1, a2) {
    let p1 = 0, p2 = 0, p = 0
    const mergeArr = []
    // 先对两个数组统一做归斌
    while (p1 < a1.length && p2 < a2.length) {
        mergeArr[p++] = a1[p1] < a2[p2] ? a1[p1++] : a2[p2++]
    }
    while (p1 < a1.length) mergeArr[p++] = a1[p1++]
    while (p2 < a2.length) mergeArr[p++] = a2[p2++]
    return mergeArr
}

/**
 * 归并排序
 * @param {*} arr 
 * @param {*} lo 
 */
function MergeSort(arr = []) {
    if (arr.length <= 1) return arr
    const pivotIdx = Math.floor(arr.length / 2)
    const left = arr.slice(0, pivotIdx)
    const right = arr.slice(pivotIdx)
    return Merge(MergeSort(left), MergeSort(right))
}


/**
 * 快速排序
 * nlogn
 */
function QuickSort(arr = []) {
    if (arr.length <= 1) return arr
    const pivotIdx = Math.floor(arr.length / 2)
    // 把值切出来
    const pivotNum = arr.splice(pivotIdx, 1)[0]
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

console.log(MergeSort([3, 2, 1, 10, 12, 8, 7, 12, 300]))