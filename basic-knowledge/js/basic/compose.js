/**
 * KOA 洋葱模型
 * compose 本质是一个 DFS 函数
 */

function compose(middlewares) {
    return function (context, next) {
        let index = -1
        function dispatch(i) {
            if (i <= index) return new Promise.reject('')
            index = i
            const middleware = i === middlewares.length ? next : middlewares[i]
            if (!middleware) return Promise.resolve()
            try {
                return Promise.resolve(middleware(context, dispatch.bind(null, i + 1)))
            } catch (error) {
                return Promise.reject(error);
            }
        }
        return dispatch(0)
    }
}