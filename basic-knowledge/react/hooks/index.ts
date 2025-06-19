
let hookIndex = 0
let hooks: any[] = []

const isDepsChanged = (prev, next) => !prev || next.some((item, index) => item !== prev[index])

function rerender() {}

const miniReact = {
  useState: (initState: any) => {
    const currentIndex = hookIndex++
    hooks[currentIndex] = hooks[currentIndex] || initState
    const setState = (state: any) => {
      hooks[currentIndex] = state
      rerender()
    }
    return [hooks[currentIndex], setState]
  },
  useEffect(callback, deps) {
    const currentIndex = hookIndex++
    const prevDeps = hooks[currentIndex]
    if (isDepsChanged(prevDeps, deps)) {
      requestIdleCallback(callback)
      hooks[currentIndex] = deps
    }
  },
  useMemo(factory, deps) {
    const currentIndex = hookIndex++
    // 依赖没有变化需要返回值 所以下边额外存储一个值
    const [prevValue, prevDeps] = hooks[currentIndex] || [null, []]
    if (isDepsChanged(prevDeps, deps)) {
      const result = factory()
      hooks[currentIndex] = [result, deps]
      return result
    }
    return prevValue
  },
  useCallback(factory, deps) {
    return miniReact.useMemo(() => factory, deps)
  },
  useRef(initValue) {
    const currentIndex = hookIndex++
    hooks[currentIndex] = hooks[currentIndex] || { current: initValue }
    return hooks[currentIndex]
  }
}