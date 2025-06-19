/*
 * @Author: leelongxi leelongxi@foxmail.com
 * @Date: 2025-05-25 17:50:28
 * @LastEditors: leelongxi leelongxi@foxmail.com
 * @LastEditTime: 2025-05-25 18:33:12
 * @FilePath: /interview-coding/basic-knowledge/react/lifecycle/getSnapshotBeforeUpdate.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';

/**
 * static getDerivedStateFromProps(nextProps: Readonly<any>, prevState: Readonly<any>): any | null | undefined;
 * render(): ReactNode;
 * getSnapshotBeforeUpdate(prevProps: Readonly<any>, prevState: Readonly<any>): any | null | undefined;
 * componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void;
 */
export class ChatBox extends React.Component<any, any> {
    chatRef: any;
    getSnapshotBeforeUpdate(prevProps: Readonly<any>, prevState: Readonly<any>) {
        // 1. 这个函数返回值会作为 componentDidUpdate 的第三个参数
        // 2. 这个函数的执行时机是在 render 之后，componentDidUpdate 之前
        if (prevProps.messages.length < this.props.messages.length) {
            const messagesEndRef = this.chatRef;
            messagesEndRef.scrollIntoView({ behavior: 'smooth' });
        }
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot: any) {
        // 1. 这个函数的执行时机是在 render 之后，componentDidUpdate 之前
        // 2. 这个函数的第三个参数是 getSnapshotBeforeUpdate 的返回值
        if (snapshot !== null) {
            // 根据之前的快照信息调整滚动位置
            this.chatRef.scrollTop = this.chatRef.scrollHeight - snapshot;
          }
    }
    render() {
        return (
            <div className="chat-box">
                {this.props.messages.map((message: any, index: number) => {
                    return <div key={index}>{message}</div>
                })}
                <div ref={el => { this.chatRef = el; }} />
            </div>
        )
    }

}