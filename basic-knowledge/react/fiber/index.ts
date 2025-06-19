/*
 * @Author: leelongxi leelongxi@foxmail.com
 * @Date: 2025-05-24 14:49:52
 * @LastEditors: leelongxi leelongxi@foxmail.com
 * @LastEditTime: 2025-05-26 11:42:53
 * @FilePath: /interview-coding/basic-knowledge/react/fiber/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * React 16.8 Fiber架构
 */

interface VDom {
    type: string; // e.g., 'div', 'span', or a component function
    props: {
        children?: VDom[];
        [key: string]: any; // For other props like id, className, text content, etc.
    };
}

interface Fiber {
    type: VDom['type'];
    props: VDom['props'];
    dom: HTMLElement | Text | null;
    parent: Fiber | null;
    child: Fiber | null;
    sibling: Fiber | null;
    alternate: Fiber | null; // Used in reconciliation
    effectTag?: 'PLACEMENT' | 'UPDATE' | 'DELETION'; // Effect tag for commit phase
}

let nextUnitOfWork: Fiber | null = null;

function createFiberTree(vdom: VDom, parentFiber) {
    const fiber: Fiber = {
        type: vdom.type,
        props: vdom.props,
        parent: null,
        child: null,
        sibling: null,
        alternate: null,
        effectTag: 'PLACEMENT',
        dom: null,
        // parentDom: parentFiber
    }
    return fiber;
}

function performUnitOfWork(fiber) {
   if (!fiber.dom) {
      fiber.dom = document.createElement(fiber.type);
      Object.keys(fiber.props).forEach(key => {
         if (key !== 'children') {
            fiber.dom[key] = fiber.props[key];
         }
      });
   }

   if (fiber.parent) {
        fiber.parent.dom.appendChild(fiber.dom);
    }

    const children = fiber.props.children || [];
    let prevSibling: Fiber | null = null;
    children.forEach((child, index) => {
        const newFiber = createFiberTree(child, fiber);
        newFiber.parent = fiber
        if (index === 0) {
            fiber.child = newFiber;
        } else {
            if (prevSibling) {
                prevSibling.sibling = newFiber as Fiber;
            }
        }
        prevSibling = newFiber as Fiber;
    });

    if (fiber.child) {
        return fiber.child;
    }

    let nextFiber = fiber;
    while (nextFiber) {
        if (nextFiber.sibling) {
            return nextFiber.sibling;
        }
        nextFiber = nextFiber.parent;
    }
    return null
}

function workLoop(deadline) {
    while (nextUnitOfWork && deadline.timeRemaining() > 1) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    }
    if (nextUnitOfWork) {
        requestIdleCallback(workLoop)
    }
}

function rerender2(vdom: VDom, container: HTMLElement) {
    const rootFiber = createFiberTree(vdom, container);
    nextUnitOfWork = rootFiber;
    requestIdleCallback(workLoop);
}