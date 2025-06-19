
const circleDep = new WeakMap()

function cloneDeep (object) {

    if (typeof object !== 'object' || object == null) {
        // symbol
        if (object instanceof Symbol) object = Symbol(object.description)
        // Date
        if (object instanceof Date) object = new Date(object)
        // regexp
        if (object instanceof RegExp) object = new RegExp(object)
        return object
    }

    // 处理循环引用
    const objFromMap = circleDep.get(object)

    if (objFromMap) return objFromMap

    let target = {}

    // 循环引用
    circleDep.set(object, target)

    if (object instanceof Map) {
        target = new Map()
        object.forEach((v, k) => {
            const v1 = cloneDeep(v)
            const k1 = cloneDeep(k)
            target.set(k1, v1)
        })
    }

    if (object instanceof Set) {
        target = new Set()
        object.forEach(v => {
            const v1 = cloneDeep(v)
            target.add(v1)
        })
    }

    if (object instanceof Array) {
        target = object.map((i) => cloneDeep(i))
    }

    if (object instanceof Function) {
        target = eval(object.toString())
        target.prototype = object.prototype
    }

    for(const k in object) {
        if (!object.hasOwnProperty(k)) {
            const value = object[k]
            const cloneValue = cloneDeep(value)
            target[k] = cloneValue
        }
    }

    return target
}