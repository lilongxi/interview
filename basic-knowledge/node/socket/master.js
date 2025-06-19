const axon = require('axon') // 解决了 TCP 沾包的库
const sock = axon.socket('push')

sock.bind(3000)
let data = Array(1024 * 1024).fill('0').join('');

setInterval(() => {
  let i = 100;
  while(i--) sock.send(`${data}|${Date.now()}`);
}, 1000);