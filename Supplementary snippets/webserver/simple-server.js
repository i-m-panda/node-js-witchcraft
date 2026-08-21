import { createServer } from 'node:http';

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
    // sets the status code of response
    res.statusCode = 200;
    // sets header of the response
    res.setHeader('Content-Type', 'text/plain');
    
    res.end('Hello World');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});