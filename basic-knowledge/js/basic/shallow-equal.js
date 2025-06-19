
function shallowEqual(x, y) {
    if (x === y) return true
    if ((typeof x === 'object' && x != null) && (typeof y === 'object' && y != null)) {
        if (Object.keys(x).length != Object.keys(y).length) return false
        for (const prop in x) {
            if (y.hasOwnProperty(x)) {
                if (x[prop] != y[prop]) return false
            } else {
                return false
            }
        }
        return true
    }
    return false
}

function deepEqual(x, y) {
    if (x === y) return true
    if ((typeof x === 'object' && x != null) && (typeof y === 'object' && y != null)) {
        if (Object.keys(x).length !== Object.keys(y).length) return false
        for (const prop in x) {
            if (y.hasOwnProperty(x)) {
                if (!deepEqual(x[prop], y[prop])) return false
            } else {
                return false
            }
        }
        return true
    }
    return false
}