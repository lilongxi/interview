function updateView() {
    console.log('===== updateView')
}

const oldArraryProperty = Array.prototype
const arrProto = Object.create(oldArraryProperty)

['push', 'pop', 'shift', 'unshift'].forEach(method => {
    arrProto[method] = function() {
        updateView()
        oldArraryProperty[method].call(this, ...arguments)
    }
});

function defineReactive(target, key, value) {
    observer(value)
    Object.defineProperty(target, key, {
        get() {
            return value
        },
        set(newValue) {
            if (newValue !== value) {
                value = newValue
                observer(newValue)
                updateView()
            }
        }
    })
}

function observer(data = {}) {
    if (typeof data !== 'object') return data
    if (Array.isArray(data)) data.__proto__ = arrProto
    for (const k in data) defineReactive(data, k, data[k])
}

 class Vue {
    constructor(options = {}) {
        this._data = options.data
        observer(this._data)
    }
 }