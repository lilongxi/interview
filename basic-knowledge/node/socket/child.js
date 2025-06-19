const axon = require('axon') // 解决了 TCP 沾包的库
const sock = axon.socket('pull')

sock.connect(3000)

let i = 0;

sock.on('message', (str) => {
  let now = Date.now();
  let [data, time] = str.split('|')
  console.log(i++, now - Number(time));
});