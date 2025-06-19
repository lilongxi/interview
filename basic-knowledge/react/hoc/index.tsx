/*
 * @Author: leelongxi leelongxi@foxmail.com
 * @Date: 2025-05-26 11:10:10
 * @LastEditors: leelongxi leelongxi@foxmail.com
 * @LastEditTime: 2025-05-26 11:37:11
 * @FilePath: /interview-coding/basic-knowledge/react/hoc/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * HOC: 入参是一个组件，返回一个组件 并且是一个纯函数 用于抽离重复代码 实现组件复用 条件渲染或者渲染拦截 拦截生命周期
 * 属性代理 : 外 -> 内 传递 props
 * 反向继承 : 内 -> 外 外部 render props state
 * 
 */
import React from 'react';
import { cloneElement } from 'react';

export function HOC(WrappedComponent: any) {
    const newProps = {
        name: 'leelongxi'
    }
    return props => {
        // 属性代理 操作 props
        return <WrappedComponent {...props} {...newProps} />
    }
}

export function HOC2(WrappedComponent: any) {
    return class extends React.Component {
        render() {
            return <WrappedComponent {...this.props} />
        }
    }
}

//  反向继承
export function HOC3(WrappedComponent: any) {
    const didMount = WrappedComponent.prototype.componentDidMount;
    return class extends WrappedComponent {
        constructor(props: any) {
            super(props);
        }
        async componentDidMount() {
            console.log('HOC3 componentDidMount');
            // super.componentDidMount();
            if (didMount) {
                await didMount.call(this);
            }
        }
        render() {
            return super.render();
        }
    }
}


// tree
export function HOC4(WrappedComponent: any) {
    return class extends WrappedComponent {
        constructor(props: any) {
            super(props);
        }
        render() {
           const tree = super.render();
           const newTree = cloneElement(tree, {
               name: 'leelongxi'
           })
           return newTree;
        }
    }
}