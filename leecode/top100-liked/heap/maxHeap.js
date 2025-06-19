class MaxHeap {

    constructor() {
        this.heap = [];
    }

    // 向堆中插入元素
    insert(value) {
        this.heap.push(value);
        this.bubbleUp();
    }

    // 获取堆中的最大元素（堆顶元素）
    getMax() {
        if (this.isEmpty()) {
            return null;
        }
        if (this.heap.length === 1) {
            return this.heap.pop();
        }
        const max = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown();
        return max;
    }

    // 获取堆的大小
    size() {
        return this.heap.length;
    }

    // 检查堆是否为空
    isEmpty() {
        return this.heap.length === 0;
    }

    // 上浮操作，用于保持大顶堆性质
    bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index] <= this.heap[parentIndex]) {
                break;
            }
            // 交换子节点和父节点
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }

    // 下沉操作，用于保持大顶堆性质
    bubbleDown() {
        let index = 0;
        const length = this.heap.length;
        while (true) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            let largest = index;
            if (leftChildIndex < length && this.heap[leftChildIndex] > this.heap[largest]) {
                largest = leftChildIndex;
            }
            if (rightChildIndex < length && this.heap[rightChildIndex] > this.heap[largest]) {
                largest = rightChildIndex;
            }
            if (largest === index) {
                break;
            }
            // 交换当前节点和最大子节点
            [this.heap[index], this.heap[largest]] = [this.heap[largest], this.heap[index]];
            index = largest;
        }
    }
}

// 示例用法
const maxHeap = new MaxHeap();
maxHeap.insert(5);
maxHeap.insert(10);
maxHeap.insert(7);
maxHeap.insert(3);

console.log(maxHeap.getMax()); // 输出 10
console.log(maxHeap.getMax()); // 输出 7
