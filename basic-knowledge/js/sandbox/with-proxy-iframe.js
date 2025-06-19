
// 任意使用 document、location 等全局变量且不会影响主页面。

class SandboxGlobalProxy {
    constructor(sharedState) {
        // 创建一个 iframe 对象，取出其中的原生浏览器全局对象作为沙箱的全局对象
        const iframe = document.createElement('iframe', {url: 'about:blank'})
        document.body.appendChild(iframe)
        const sandboxGlobal = iframe.contentWindow // 沙箱运行时的全局对象
        return new Proxy(sandboxGlobal, {
            has: (target, prop) => { // has 可以拦截 with 代码块中任意属性的访问
                if (sharedState.includes(prop)) { // 如果属性存在于共享的全局状态中，则让其沿着原型链在外层查找
                    return false
                }

                if (!target.hasOwnProperty(prop)) {
                    throw new Error(`Invalid expression - ${prop}! You can not do that!`)
                }
                return true
            }
        })

    }
}

function maybeAvailableSandbox(code, ctx) {

    withedYourCode(code).call(ctx, ctx)

}

const code_1 = `

    console.log(history == window.history) // false

    window.abc = 'sandbox'

    Object.prototype.toString = () => {

        console.log('Traped!')

    }

    console.log(window.abc) // sandbox

`

const sharedGlobal_1 = ['history'] // 希望与外部执行环境共享的全局对象

const globalProxy_1 = new SandboxGlobalProxy(sharedGlobal_1)

maybeAvailableSandbox(code_1, globalProxy_1)