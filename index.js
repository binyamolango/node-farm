const fs = require('fs');
const http = require('http');
const url = require('url');

////////////////////////////
// Blocking, sync

// const input = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(input);

// fs.writeFileSync('./txt/output.txt', input);

////////////////////////////////
// Non-blocking, async

// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, () => {
//                 console.log("Wrote the above on the file!");
//             });

//             console.log(`${data2}\n${data3}`);
//         })
//     })
// })
// console.log("Will read this!");

////////////////////////////////////
// Web servers

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const pathName = req.url;

    // Overview page
    if (pathName === '/' || pathName === '/overview') {
        res.end('This is the OVERVIEW');
    
    // Product page
    } else if (pathName === '/product') {
        res.end('This is the PRODUCT');
    
    // Api page
    } else if (pathName === '/api') {
        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(data);
    
    // Error page
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end('<h1>Page not found!</h1>');
    }
})

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
})