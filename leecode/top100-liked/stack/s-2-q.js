/**
 * 栈 实现 队列
 * 核心：两个栈
 */

class MyQueue {

    stack1 = []
    stack2 = []

    add (n) {
        this.stack1.push(n)
    }

    delete() {
        const s1 = this.stack1
        const s2 = this.stack2
        let ele
        
        while (s1.length) {
            const tail = s1.pop()
            s2.push(tail)
        }

        ele = s2.pop()
        while (s2.length) {
            const tail = s2.pop()
            s2.push(tail)
        }
        return ele
    }

    get length() {
        return this.stack1.length
    }
}

