/**
 * stk 栈的所有值
 * minStk 最小栈的所有值
 */

var MinStack = function() {
    this.stk = []
    this.minStk = []
};

/** 
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function(val) {
    this.stk.push(val)
    // 或者 Math.min 每次都向最小栈推入相对小的哪个
    // min(val, this.minStk[this.minStk.length - 1])
    if (this.minStk.length === 0 || val <= this.minStk[this.minStk.length - 1]) {
        this.minStk.push(val)
    }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    if (this.stk[this.stk.length - 1] === this.minStk[this.minStk.length - 1]) {
        this.minStk.pop()
    }
    this.stk.pop()
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.stk[this.stk.length - 1]
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    return this.minStk[this.minStk.length - 1]
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */