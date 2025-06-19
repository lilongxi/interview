const child_process = require('child_process');

// 每一份发 100 条数据，每条数据 1MB 大小：
let child = child_process.fork('./child.js');
let data = Array(1024 * 1024).fill('0').join('');

setInterval(() => {
  let i = 100;
  while(i--) child.send(`${data}|${Date.now()}`);
}, 1000);
