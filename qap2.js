const http = require('http');
const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');

const server = http.createServer((req, res) => {
    const { url } = req;

    switch (url) {
        case '/about':
            servePage(res, 'about.html');
            break;
        case '/contact':
            servePage(res, 'contact.html');
            break;
        case '/products':
            servePage(res, 'products.html');
            break;
        case '/subscribe':
            servePage(res, 'subscribe.html');
            break;
        default:
            servePage(res, 'index.html');
    }
});

function servePage(res, page) {
    const filePath = `${__dirname}/FullStackQAP2/${page}`;

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Page not found');
            console.error(`Failed to read file: ${page}, Error: ${err}`);
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
            console.log(`Served ${page} successfully`);
        }
    });
}

const server2 = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = `${__dirname}/FullStackQAP2/index.html`;
    } else {
        filePath = `${__dirname}/FullStackQAP2${req.url}.html`;
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead( 404, {'Content-type': 'text/plain'});
                res.end('404 Not Found');
                console.error(`File not found: ${filePath}`);
            } else {
                res.writeHead(500,{'Content-Type': 'text/plain'});
                res.end('500 Internal Server Error');
                console.error(`Internal Server Error ${err}`);
            }
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
            console.log(`Server ${filePath}`);
        }
    });
});

class MyEmitter extends EventEmitter {};
const myEmitter = new MyEmitter ();

myEmitter.on ('status', (code) => {
    console.log(`Status Code: ${code}`);
});

myEmitter.on('routeAccess', (route) => {
    console.log(`Route Access: ${route}`);
});


const server3 = http.createServer((req, res) => {
    const {url} = req;

    if(url === '/about') {
        myEmitter.emit('routeAccess', '/about');
    }

    switch (url) {
        case '/about':
            servePage(res, 'about.html');
            break;
        case '/contact':
            servePage(res, 'contact.html');
            break;
        case '/products':
            servePage(res, 'products.html');
            break;
        case '/subscribe':
            servePage(res, 'subscribe.html');
            break;
        default:
            servePage(res, 'index.html');
    }
});

function servePage(res, page) {
    const filePath = `${__dirname}/FullStackQAP2/${page}`;

    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Page not found');
                myEmitter.emit('status', 404); 
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                myEmitter.emit('status', 500); 
            }
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
            myEmitter.emit('status', 200); 
        }
    });
}





const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

const PORT2 = 3001;
server2.listen(PORT2, () => {
    console.log(`Server is listening on port ${PORT2}`);
});

const PORT3 = 3002;
server3.listen(PORT3, () => {
    console.log(`Server is listening on port ${PORT3}`);
});