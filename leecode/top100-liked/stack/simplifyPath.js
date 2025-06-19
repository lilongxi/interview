/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function(path) {
    const paths = path.split('/')
    const stk = []
    for (const p of paths) {
        if (p === '..') {
            stk.pop()
        } else if (p !== '.' && p.length) {
            stk.push(p)
        }
    }
    return '/' + stk.join('/')
};