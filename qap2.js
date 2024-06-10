const http = require('http');
const fs = require('fs');
const path = require('path');

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
    const filePath = `${__dirname}/views/${page}`;

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
        filePath = `${__dirname}/views/index.html`;
    } else {
        filePath = `${__dirname}/views${req.url}.html`;
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

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

const PORT2 = 3001;
server2.listen(PORT2, () => {
    console.log(`Server is listening on port ${PORT2}`);
});