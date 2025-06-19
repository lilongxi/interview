const cluster = require('cluster')
const http = require('http')
const numCPUs = require('os')

if (cluster.isMaster) {
     // Fork workers.                            
    for (var i = 0; i < numCPUs; i++) {          
        cluster.fork();                          
    }                                            
    cluster.on('exit', (worker) => {             
        console.log(`${worker.process.pid} died`);
    });            
} else {
    http.createServer((req, res) => {            // | 
        res.writeHead(200);                        // |   仅子进程执行 (b.js)
        res.end('hello world\n');                  // | 
      }).listen(8000); 
}

console.log(__dirname)