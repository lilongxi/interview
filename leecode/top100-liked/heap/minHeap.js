class MinHeap {
    
    constructor() {
        this.heap = [];
    }

    // 向堆中插入元素
    insert(value) {
        this.heap.push(value);
        this.bubbleUp();
    }

    // 获取堆中的最小元素（堆顶元素）
    getMin() {
        if (this.isEmpty()) {
            return null;
        }

        if (this.heap.length === 1) {
            return this.heap.pop();
        }

        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown();

        return min;
    }

    // 获取堆的大小
    size() {
        return this.heap.length;
    }

    // 检查堆是否为空
    isEmpty() {
        return this.heap.length === 0;
    }

    // 上浮操作，用于保持小顶堆性质
    bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index] >= this.heap[parentIndex]) {
                break;
            }
            // 交换子节点和父节点
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }

    // 下沉操作，用于保持小顶堆性质
    bubbleDown() {
        let index = 0;
        const length = this.heap.length;

        while (true) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            let smallest = index;
            if (leftChildIndex < length && this.heap[leftChildIndex] < this.heap[smallest]) {
                smallest = leftChildIndex;
            }
            if (rightChildIndex < length && this.heap[rightChildIndex] < this.heap[smallest]) {
                smallest = rightChildIndex;
            }
            if (smallest === index) {
                break;
            }
            // 交换当前节点和最小子节点
            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }
}

// 示例用法
const minHeap = new MinHeap();
minHeap.insert(5);
minHeap.insert(10);
minHeap.insert(7);
minHeap.insert(3);

console.log(minHeap.getMin()); // 输出 3
console.log(minHeap.getMin()); // 输出 5
