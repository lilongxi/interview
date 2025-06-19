const childProcess = require('child_process');
const net = require('net');

const cpuNum = require('os').cpus().length;

let workers = []
let cur = 0

for (let i = 0; i < cpuNum; ++i) {
    workers.push(childProcess.fork('./worker.js'));
    console.log('worker process-' + workers[i].pid);
}

const tcpServer = net.createServer()
/*
 服务器收到请求后分发给工作进程去处理
*/
// tcpServer.on('connection', socket => {
//     workers[cur].send('socket', socket)
//     // 给下一个 work
//     cur = Number.parseInt((cur + 1) % cpuNum);
// })


tcpServer.listen(8989, () => {
    console.log('Tcp Server: 127.0.0.8989');
    for (let i = 0; i < cpuNum; ++i) {
        // 监听端口后将服务器句柄发送给worker进程
        //  当网络请求到来的时候，会进行抢占式调度，只有一个worker进程会抢到链接然后进行服务
        workers[i].send('tcpServer', tcpServer)
    }

     // 监听工作进程退出事件
     workers[i].on('exit', ((i) => {
        return () => {
          console.log('worker-' + workers[i].pid + ' exited');
          workers[i] = childProcess.fork('./worker.js');
          console.log('Create worker-' + workers[i].pid);
          workers[i].send('tcpServer', tcpServer);
        }
      })(i));


    // 关闭master线程的端口监听
    // 不能关闭master线程的，否则的话，句柄将为空，无法正常传递。
    tcpServer.close()
})
