const http = require('http');
const app = require('./app');
const server = http.createServer(app);

server.listen(2500,()=>{
    console.log('server is 2500');
})
