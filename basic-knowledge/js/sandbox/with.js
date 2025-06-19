const name = 'lilongxi'
const ctx = {
    func: variable => console.log(variable),
    foo: 'foo'
}

function poorestSandbox(code, ctx) {
    // 叠加一个 ctx 的作用域
    with(ctx) {
        eval(code)
    }
}

const code = `
    foo = 'bar'
    func(foo)
    // 我逃逸了
    console.log(name)
`

poorestSandbox(code, ctx)