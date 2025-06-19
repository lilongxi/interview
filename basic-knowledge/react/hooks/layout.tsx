/*
 * @Author: leelongxi leelongxi@foxmail.com
 * @Date: 2025-05-25 20:06:02
 * @LastEditors: leelongxi leelongxi@foxmail.com
 * @LastEditTime: 2025-05-25 20:11:17
 * @FilePath: /interview-coding/basic-knowledge/react/hooks/layout.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * 
 * useLayoutEffect 会在所有的 DOM 变更之后同步调用 effect。可以使用它来读取 DOM 布局并同步触发重渲染。在浏览器执行绘制之前，useLayoutEffect 内部的更新计划将被同步刷新。 用户看不到第一次 render 的DOM，但是会看到之后的 DOM。
 * useEffect 则在浏览器完成屏幕绘制之后执行。
 */
import React from 'react';

export function SnapshotBeforeUpdate() {
    const [value, setValue] = React.useState(0);
    const divRef = React.useRef<HTMLDivElement>(null);

    const snapshotRef = React.useRef<number>(0);

    React.useLayoutEffect(() => {
        snapshotRef.current = divRef.current?.offsetWidth ?? 0;
    });

    React.useEffect(() => {
        if (divRef.current && divRef.current.offsetWidth !== snapshotRef.current) {
            console.log('width changed');
        }
    })

    return (
        <div>
        <button onClick={() => setValue((v) => v + 1)}>更新</button>
        <div
          ref={divRef}
          style={{ height: 100, overflowY: 'auto', border: '1px solid black' }}
        >
          <div style={{ height: 300 }}>滚动区域 {value}</div>
        </div>
      </div>
    )

}