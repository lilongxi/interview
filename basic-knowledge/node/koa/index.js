/**
 * https://utauu.notion.site/NODE-f7ead693f8c84595b87dc655510b3999
 * KOA:
 * Application koaCore 服务监听 + 中间价注册
 * Context
 * Request
 * Response
 */


const http = require('http')

class Context {
    constructor(req, res) {
        this.req = req
        this.res = res
        this.init()
    }
    init() {
        this.res.forEach(i => this[i] = i)
    }
}

class Application {
    constructor() {
        this.middleware = null
    }
    listen(...args) {
        const server = http.createServer(() => {
            const ctx = new Context(req, res)
            return this.middleware?.(ctx)
        })
        server.listen(...args)
    }
    use(middleware) {
        this.middleware = middleware
    }
}

// 定义第一个中间件
async function middleware1(context, next) {
    console.log('Enter middleware 1');
    await next(); // 调用下一个中间件，实现“穿透”
    console.log('Leave middleware 1');
  }
  
  // 定义第二个中间件
  async function middleware2(context, next) {
    console.log('Enter middleware 2');
    await next(); // 调用下一个中间件，实现“穿透”
    console.log('Leave middleware 2');
  }
  
  // 定义第三个中间件
  async function middleware3(context, next) {
    console.log('Enter middleware 3');
    await next(); // 调用下一个中间件，实现“穿透”
    console.log('Leave middleware 3');
  }
  
  // 实现洋葱模型
const middlewares = [middleware1, middleware2, middleware3];


function compose(middlewares) {
    return function (context, next) {
        let index = -1
        function dispatch(i) {
            if (i <= index) return Promise.reject(new Error('next() called multiple times'));
            index = i
            let middleware = middlewares[i]
            if (i === middlewares.length) {
                middleware = next
            }
            if (!middleware) { // 如果不存在中间件，则返回一个空Promise对象
                return Promise.resolve();
            }
            try {
                return Promise.resolve(middleware(context, dispatch.bind(null, i + 1)))
            } catch (error) {
                return Promise.reject(err);
            }
        }
        return dispatch(0)
    }
}