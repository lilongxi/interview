function extend(child, parent) {
    //
    Object.setPrototypeOf(child, parent.prototype)
    // 和 Object.create 区别在于 这里实例方法的复制
    function factory() {
        this.constructor = child
    }
    factory.prototype = parent.prototype
    child.prototype = parent ? new factory : Object.create(null)
}