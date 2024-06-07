const http = require('http');
const fs = require('fs');

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

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
