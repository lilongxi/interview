/**
 * 
 * @param {*} source 
 * @param {*} path 
 * @param {*} defaulValue 
 * @returns 
 * 
 */

const r = /\[(\d+)\]/g

function get(source, path, defaulValue = undefined){
    // 转换数组 a[2].b => a.2.b
    const paths = path.replace(/\[(\d+)\]/g, '.$1').split('.')
    let result = source
    for (const p of paths) {
        // 无论是数组还是对象都能兼容
        result = Object(result)[p]
        if (result === undefined) return defaulValue
    }
    return result
}
