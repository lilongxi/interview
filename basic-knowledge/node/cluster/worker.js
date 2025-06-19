// 接收主进程发来的消息
process.on('message', (msg, tcpServer) => {

    // if (msg === 'socket' && socket) {
    //   // 利用setTimeout 模拟异步请求
    //   setTimeout(() => {
    //     socket.end('Request handled by worker-' + process.pid);
    //   },100);
    // }

    if (msg === 'tcpServer' && tcpServer) {
        tcpServer.on('connection', (socket) => {
          setTimeout(() => {
            socket.end('Request handled by worker-' + process.pid);
          }, 100);
        })
      }
  
});
