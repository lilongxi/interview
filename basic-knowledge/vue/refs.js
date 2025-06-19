
function ref(value) {
    const wrapper = {
        value
    }
    Object.defineProperty(wrapper, '__v_isRef', {
        value: true
    })
    return wrapper
}

function toRef(obj, key) {
    const wrapper = {
        get value() {
            return obj[key]
        },
        set value(val) {
            obj[key] = val
        }
    }
    return wrapper
}

function toRefs(obj) {
    const ret = {}
    for (const key in obj) {
        ret[key] = toRef(obj, key)
    }
    return ret
}

function reactive(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return
    }
    if (obj.__v_isReactive) {
        return obj
    }
    const observed = new Proxy(obj, {
        get(target, key, receiver) {
            console.log('get', key)
            const res = Reflect.get(target, key, receiver)
            return res
        }
    })
    return observed
}