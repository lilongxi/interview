function instanceOf(instance, origin) {
    if (instance == null) return false
    const type = typeof instance
    if (type !== 'object' && type !== 'function') return false
    let proto = instance.__proto__
    while (proto) {
        if (proto === origin.prototype) return true
        proto = proto.__proto__
    }
    return false
}

console.log(instanceOf({}, Object))