/***
 * webpack 基本的模块转换实现
 */

(function(modules) {
    const installedModules = {}
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId]
        const module = (installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        })
        // 执行代码并改变 this 指向到 module.exports
        modules[moduleId].call(
            module.exports,
            module,
            module.exports,
            __webpack_require__
        )
        module.l = true
        return module.exports
    }
    return __webpack_require__(__webpack_require__.s = 0)
})({
    './src/index.js': function(module, exports, __webpack_require__) {
        eval(`
            const css = __webpack_require__("./src/style/index.css")
            const a = 100;
            console.log(a, css)
        `)
    },
    './src/style/index.css': function(module, exports, __webpack_require__) {
    },
    0: function(module, exports, __webpack_require__) {
        module.exports = __webpack_require__('./src/index.js')
    }
})