/**
 * 
 * @param {*} context 
 * @param  {...any} bindArgs 
 * @returns 
 * 返回一个匿名函数，前后两次的参数会拼接到一起
 */
Function.prototype.myBind = function(context, ...bindArgs) {
    const self = this
    return function (...args) {
        // 把两次参数取出来 变成一份
        const newArgs = bindArgs.concat(args)
        return self.myApply(context, newArgs)
    }
}

/**
 * 核心考点：使用传入的 context 执行函数 改变 this 指向
 * @param {*} context 
 * @param  {...any} args 
 * @returns 
 */
Function.prototype.myCall = function(context, ...args) {
    if (context == null) context = globalThis
    // 如果是 值类型 实例化其的上下文对象
    if (typeof context !== 'object') context = new Object(context)
    const myCall = Symbol.for('myCall')
    context[myCall] = this
    // 使用当前上下文执行函数 改变 this
    const res = context[myCall](...args)
    delete context[myCall]
    return res
}

Function.prototype.myApply = function(context, args = []) {
    if (context == null) context = globalThis
    if (typeof context !== 'object') context = new Object(context)
    const myApp = Symbol.for('myApp')
    context[myApp] = this
    const value = context[myApp](args)
    delete context[myApp]
    return value
}

