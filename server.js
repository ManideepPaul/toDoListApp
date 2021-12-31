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
const mongoose = require('mongoose');
const { json } = require('express/lib/response');

app.use(express.urlencoded())

// For mongodb atlas connection

const uri = "mongodb+srv://mandytim:t841301@todoapp.gmqdx.mongodb.net/ToDoApp?retryWrites=true&w=majority"

mongoose.connect(uri); 

// Create mongoose schema
const add = new mongoose.Schema({
    task: String,
    id: Number
});

// Creating schema into model
const toDo = mongoose.model('toDo', add);

app.use('/', express.static(path.resolve(__dirname, 'static')))

// console.log(__dirname)

let idCounter = 0

app.post('/add', (req, res) => {
    let idValue = Math.random() * (idCounter + 1)

    let gettoDo = new toDo({
        task: req.body.task,
        id: idValue
    });
    gettoDo.save()

    idCounter = idCounter + 1;
    // console.log(getTask)
    res.status(204).redirect('/')
})

app.get('/tasks', async (req, res) => {
    let data = await toDo.find()
    // console.log(data)
    res.json(data)
})

app.post('/delete', async (req, res) => {
    console.log(req.body)
    await toDo.deleteOne(req.body)
    res.status(204).redirect('/')
})

app.listen(port, () => {
    console.log(`This app is listening at http://localhost:${port}`)
})