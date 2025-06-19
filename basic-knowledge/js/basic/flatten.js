function flatten(arr = []) {
    const result = []
    arr.forEach(item => {
        if (Array.isArray(item)) {
            flatten(item || []).forEach(i => result.push(i))
        } else {
            result.push(item)
        }   
    })
    return result
}