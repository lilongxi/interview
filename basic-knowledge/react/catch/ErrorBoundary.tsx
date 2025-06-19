/*
 * @Author: leelongxi leelongxi@foxmail.com
 * @Date: 2025-05-25 19:24:33
 * @LastEditors: leelongxi leelongxi@foxmail.com
 * @LastEditTime: 2025-05-25 19:28:27
 * @FilePath: /interview-coding/basic-knowledge/react/catch/ErrorBoundary.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';
import { PropsWithChildren } from 'react';

/**
 * 
 * function renderComponent(component) {
  try {
    // 执行函数组件 or 类组件的 render 方法
  } catch (error) {
    // 这里被框架捕获，并标记 Fiber 上的 “effectTag = Capture”
    // 然后启动错误处理流程
  }
}
  2. 向上冒泡寻找最近的 ErrorBoundary
React 的 reconciler 会向上查找是否有类组件实现了：
static getDerivedStateFromError
或
componentDidCatch

let parent = fiber.return;
while (parent !== null) {
  if (isErrorBoundary(parent)) {
    return parent;
  }
  parent = parent.return;
}


 */

export class ErrorBoundary extends React.Component<PropsWithChildren, { hasError: boolean }> {
  constructor(props: {}) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any) {
    console.log(error, info);
  }
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}