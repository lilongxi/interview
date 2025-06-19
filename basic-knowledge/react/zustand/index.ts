/*
 * @Author: leelongxi leelongxi@foxmail.com
 * @Date: 2025-05-25 18:37:46
 * @LastEditors: leelongxi leelongxi@foxmail.com
 * @LastEditTime: 2025-05-25 18:54:23
 * @FilePath: /interview-coding/basic-knowledge/react/zustand/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React from "react";

type State = Record<string, any>
type StateCreator<T extends State, U = T> = (
    set: (partial: Partial<T> | ((state: T) => Partial<T>)) => void,
    get: () => U
) => T;
type Listener<T> = (state: T) => void;

export function createStore<T extends State>(createState: StateCreator<T>) {
    let state: T;
    const listeners = new Set<Listener<T>>();

    const setState = (partial: Partial<T> | ((state: T) => Partial<T>)) => {
        const nextState = typeof partial === 'function' ? partial(state) : partial;
        state = { ...state, ...nextState };
        listeners.forEach((listener) => listener(state));
    };

    const getState = () => state;
    const subscribe = (listener: Listener<T>) => {
        listeners.add(listener);
        return () => listeners.delete(listener);
    };

    state = createState(setState, getState);

    const useStore = <U>(selector: (state: T) => U, equalityFn: (a: U, b: U) => boolean = Object.is) => {
        const [, forceUpdate] = React.useReducer((x) => x + 1, 0);
        const selectedState = React.useRef<U>(selector(state));
        React.useEffect(() => {
            const checkForUpdate = () => {
              const newSelectedState = selector(state);
              if (!equalityFn(selectedState.current, newSelectedState)) {
                selectedState.current = newSelectedState;
                forceUpdate();
              }
            };
            // 初始检查一次，以防 selector 在首次渲染后立即返回不同值
            checkForUpdate(); 
            const unsubscribe = subscribe(checkForUpdate);
            return unsubscribe as () => void;
          }, [selector, equalityFn]); // 依赖 selector 和 equalityFn，如果它们改变则重新订阅
        return selectedState.current;
    };

    Object.assign(useStore, { getState, setState, subscribe });

    return useStore as typeof useStore & { 
        getState: typeof getState;
        setState: typeof setState;
        subscribe: typeof subscribe;
    };

}