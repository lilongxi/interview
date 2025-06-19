<!--
 * @Author: leelongxi leelongxi@foxmail.com
 * @Date: 2025-05-24 14:49:09
 * @LastEditors: leelongxi leelongxi@foxmail.com
 * @LastEditTime: 2025-05-24 14:49:19
 * @FilePath: /interview-coding/basic-knowledge/react/fiber/readme.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
┌────────────────────────────┐
│        React 调度器         │
│  scheduler.scheduleCallback │
└────────────┬───────────────┘
             ↓
   ┌─────────────────────┐
   │     workLoop()       │
   │  while (next && !    │
   │    shouldYield()) {  │
   │    performUnitOfWork │
   │  }                   │
   └────────────┬────────┘
                ↓
   ┌──────────────────────┐
   │ shouldYield() = true?│─────┐
   └──────────┬───────────┘     │
              ↓否               │是
     ┌────────────────────┐     │
     │ nextUnitOfWork 有？│─────┘
     └────────┬───────────┘
              ↓是
   ┌────────────────────────────┐
   │ scheduler.scheduleCallback │ ← 中断后重新调度继续执行
   └────────────────────────────┘
              ↓
           下一帧继续

