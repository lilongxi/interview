function createMyStore(reducer, enhancer) {
    const listener = []
    let state
    if (typeof enhancer === 'function') {
        const newCreateStore = enhancer(createMyStore)
        const newStore = newCreateStore(reducer)
        return newStore
    }
    const subscribe = cb => listener.push(cb)
    const getState = () => state
    const dispatch = action => {
        state = reducer(state, action)
        listener.forEach(cb => cb())
    }

    return {
        subscribe,
        getState,
        dispatch
    }

}

