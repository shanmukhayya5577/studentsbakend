const http = require('http');
const app = require('./app');
const server = http.createServer(app);

server.listen(2600,()=>{
    console.log('server is 2500');
})
