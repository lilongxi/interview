class MonotonicQueue {
    constructor() {
        this.maxq = []
    }

    push (n) {
        while (this.maxq.length && this.maxq[this.maxq.length - 1] < n) {
            this.maxq.pop()
        }
        this.maxq.push(n)
    }

    pop (n) {
        if (n === this.maxq[0]) this.maxq.shift()
    }

    max () {
        return this.maxq[0] || -1
    }

}