
/**
 * 继承主要就是两个功能
 * 1. 示例属性继承
 * 2. 原型属性继承
 */
function objectFactory() {
    // 空对象
    const obj = Object.create(null)
    // 获取父类
    const constructor = [].shift.call(arguments)
    // 原型
    obj.__proto__ = constructor.prototype
    // 实例 改变this
    const val = constructor.apply(obj, arguments)
    // 判断返回值是不是对象
    return typeof val === 'object' ? val : obj
}
