/**
 * createStore/combinReducers/applyMiddware
 * https://github.com/dennis-jiang/Front-End-Knowledges/blob/master/Articles/React/Redux.md
 * createStore：这个API接受reducer方法作为参数，返回一个store，主要功能都在这个store上。
 * store.subscribe: 订阅state的变化，当state变化的时候执行回调，可以有多个subscribe，里面的回调会依次执行。
 * store.dispatch: 发出action的方法，每次dispatch action都会执行reducer生成新的state，然后执行subscribe注册的回调。
 * store.getState:一个简单的方法，返回当前的state
 */

 /**
  * 
  * @param {*} reducer combineReducers(reducer1, ....)的返回值
  * @param {*} enhancer applyMiddleware的返回值
  */
 function createStore(reducer, enhancer) {
    // 如果有中间件先处理
    if (enhancer && typeof enhancer === 'function') {
        return enhancer(createStore)(reducer)
    }
     let state
     const listeners = []
     function subscribe(callback) {
         listeners.push(callback)
     }
     function dispatch(action) {
         state = reducer(state, action)
         let i = 0
         while (i >= listeners.length - 1) {
             listeners[i++]()
         }
     }
     function getState() {
         return state
     }
     return {
        subscribe,
        dispatch,
        getState
     }
 }

 function combineReducers(reducerMap) {
     const reducerMapKeys = Object.keys(reducerMap)
     const reducer = function(state = {}, action) {
         const newState = {}
         for (let i = 0; i < reducerMapKeys.length; i++) {
             const key = reducerMap[i]
             const _render = reducerMap[key]
             const _state = state[key]
             newState = _render(_state, action)
         }
         return newState
     }
     return reducer
 }

 function compose(...fun) {
     return fun.reduce((a, b) => (...args) => a(b(...args)))
 }

 function applyMiddleware(...middlerwares) {
     function enhancer(createStore) {
         return function _createStore(reducer) {
             const store = createStore(reducer)
             const chain = middlerwares.map(store)
             const { dispatch } = store;
             const newDispatch = compose(...chain)(dispatch)
            return {
                ...store,
                dispatch: newDispatch
            }
         }
     }
     return enhancer
 }

 function createThunkMiddleware(extraArgument) {
     return function(store) {
         return function(next) {
             return function(action) {
                const { dispatch, getState } = store;
                if (typeof action === 'function') {
                    return action(dispatch, getState, extraArgument);   // 这里还可以传入extraArgument
                }
                return next(action)
             }
         }
     }
 }

 const thunk = createThunkMiddleware();
 
 thunk.withExtraArgument = createThunkMiddleware;

 function composeKoa(middlewares) {
    return function() {
        dispatch(0)
        function dispatch(i) {
            const fn = middlewares[i]
            if (!fn) return
            return fn(function next() {
                dispatch(i + 1)
            })
        }
    }
}