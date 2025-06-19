// 区分是 mount 还是 update
let isMount = true
// 用于保存当前正在执行的 hook
let workInProgressHook = null

// 当前 fc 组件的 Fiber 节点
const fiber = {
    // 保存多个 hook 的 state [ hook1 -> hook2 -> ... -> hookN ]
    memoizedState: null,
    stateNode: App
}

// react 在 render阶段触发 renderFunction 对应的函数
function renderer() {
    // 每次执行都从第一个 hook 节点开始执行 本身也是顺序调用
    // 记录当前的 hook 到 workInProgress 这里就是第一个 当第一个 hook 执行完后 链表指针会向后移动到第二个 所以在执行第二个hook的时候 指向是对的
    workInProgressHook = fiber.memoizedState
    const app = fiber.stateNode()
    isMount = false
    return app
}

// 返回 hook 第二个更新回调
function dispatchAction(queue, action) {
    // 生成 update 对象
    const update = {
        action,
        next: null
    }
    // update对象也是一个链表 挂载在 hook 对象的 pending 节点
    if (queue.pending === null) {
        update.next = update
    } else {
        update.next = queue.pending.next
        queue.pending.next = update
    }
    queue.pending = update
    // 重新渲染 这里很重要
    renderer()
}

function useState(initialState) {
    let hook
    if (isMount) {
        hook = {
            queue: {
                pending: null
            },
            memoizedState: initialState,
            next: null
        }
        // 如果fiber没有state节点直接负值 否则
        if (!fiber.memoizedState) {
            // 保存 fc 里的第一个hook的状态即链表头 后边的hook都基于当前的hook作为其下一个节点
            fiber.memoizedState = hook
        } else {
            // 形成一个链表
            workInProgressHook.next = hook
        }
        // 当这个 hook 被执行的时候会把当前的 hook 状态负值到 workInProgressHook 代表当前正在执行哪里一个 hook
        workInProgressHook = hook
    } else {
        // 这就代表更新 通过 hook 的第二个参数 updateFn 执行 如果更新执行到这里 代表当前的 workInProgressHook 就是自己缓存一份到 hook
        // 这里都是顺序执行 所以 workInProgressHook 在render中被负值 顺序不会乱
        hook = workInProgressHook
        // 更新到下一个 hook 节点
        workInProgressHook = workInProgressHook.next
    }
    // 初始值
    let baseState = hook.memoizedState
    if (hook.queue.pending) {
        let firstUpdate = hook.queue.pending.next
        // 遍历当前 fc 里的所有 hook 节点 依次执行回调
        do {
            const action = firstUpdate.action
            baseState = action(baseState)
            firstUpdate = firstUpdate.next
        } while (firstUpdate !== hook.queue.pending.next)
        hook.queue.pending = null
    }
    // 更新状态
    hook.memoizedState = baseState
    return [
        baseState,
        dispatchAction.bind(null, hook.queue) // 当前 hook 的 updateQueueu的引用通过闭包传递
    ]
}

function App() {
    const [ num, updateNum ] = useState(0)
    const [ trigger, updateTrigger ] = useState(false)
    console.log('=====> mount', isMount)
    console.log('=====> num', num)
    console.log('=====> trigger', trigger)
    return {
        onClick() {
            updateNum(n => n + 1)
        },
        onTriger() {
            updateTrigger(i => !i)
        }
    }
}

window.app = renderer()