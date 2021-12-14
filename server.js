////////////////////// Http Server //////////////////////

// const http = require('http');
// const fs = require('fs');
// const site = fs.readFileSync('./index.html', 'utf-8')

// const port = 3000;

// const server = http.createServer((req, res) => {
//     res.writeHead(200, {'Content-type' : 'text/html'})
//     // res.setHeader('Content-Type', 'text/html');
//     // res.statusCode = 200;
//     res.end(site, 'utf-8');
// })

// server.listen(port, () => {
//     console.log(`server is listening on Port ${port}`);
// });


////////////////////// Express Server //////////////////////

const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use('/', express.static(path.resolve(__dirname, 'static')))

console.log(__dirname)

// app.get('/', (req,res) => {
//     res.sendFile(path.join(__dirname, 'index.html'))
// });

app.listen(port, () => {
    console.log(`This app is listening at http://localhost:${port}`)
})