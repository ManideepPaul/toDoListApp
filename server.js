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
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');// JWT used for authorization of user at the time of password change.
const userRec = require('./model/userRec');
const toDo = require('./model/toDo');

// This is jwt secret key.
const JWT_SECRET = 'adfafgjvlnsao%$&#&$(#kalfnlnohf';

// This will parse urlencoded post request 
app.use(express.urlencoded())
app.use(express.json());

// For mongodb atlas connection
const uri = "mongodb+srv://mandytim:t841301@todoapp.gmqdx.mongodb.net/ToDoApp?retryWrites=true&w=majority"
mongoose.connect(uri); 

app.use('/', express.static(path.resolve(__dirname, 'static')))


app.post('/add', (req, res) => {
    const { token, task } = req.body;
    
    const user = jwt.verify( token, JWT_SECRET);
    const username = user.username
    // console.log( username)
    let gettoDo = new toDo({
        task,
        username
    });
    gettoDo.save()

    // console.log(getTask)
    res.json({ status: 'ok', username: username})
})

////////////// Password change route. ////////////////
app.post('/change-password', async (req, res) => {
    const { token, newpassword } = req.body;

    // Password validation
    if (newpassword.length < 6) {
        return res.json({ 
            status: 'error', 
            error: 'Password length should be more than 6 charactors'
        })
    }

    try {
        const user = jwt.verify( token, JWT_SECRET);
        const _id = user.id; //Getting id from the token


        // Hashing the new password
        const hashedpassword = await bcrypt.hash(newpassword, 10)

        // Updating the new password in the data base.

        await userRec.updateOne(
            {_id},
            {
                $set: { password: hashedpassword }
            }
        )
        console.log('JWT Decoded',user)
    } catch (error) {
        res.json({ status: 'error', error: ';))' })
    }
    res.json({ status: 'ok' })
})

////////////// Getting data from login Page. ////////////////
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await userRec.findOne({ username }).lean() // Lean makes it readable in json format.

    if (!user) {
        return res.json({ status: 'error', error: 'Invalid Username/Password'})
    }

    if (await bcrypt.compare(password, user.password)) {

        // Creating the JWT token for user.
        const token = jwt.sign({ 
            id: user._id, 
            username: user.username 
        },
            JWT_SECRET
        )
        return res.json({ status: 'ok', data: token })// JWT token return as data, Which will be saved in local storage for authorization of user at the time of changing password.
    }
     return res.json({ status: 'error', error: 'Invalid Username/Password'});
})

////////////// Getting data from Register Page. ////////////////
app.post('/signup', async (req, res) => {
    const {name, username, password: pass} = req.body;
    // Name validation
    if(!name || typeof name !== 'string') {
        return res.json({ status: 'error', error: 'Invalid name'})
    }

    // Username validation
    if (!username || typeof username !== 'string'){
        return res.json({ status: 'error', error: 'Invalid username'})
    }

    // Password validation
    if (pass.length < 6) {
        return res.json({ 
            status: 'error', 
            error: 'Password length should be more than 6 charactors'
        })
    }
    // Hashing the password
    let password = await bcrypt.hash(pass, 10);
    try {
        await userRec.create ({
            name,
            username,
            password
        })
        console.log('New user record created')
    } catch (error) {
        if (error.code === 11000) {
            return res.json({ status: 'error', error: 'Username already exist'})
        }
        throw error
    }
    res.json({ status: 'ok' });
    // res.status(204).send();
})

////////////// Getting task data from Data base. ////////////////
app.get('/tasks', async (req, res) => {
    let data = await toDo.find()
    // console.log('Data from database: ',data)
    res.json(data)
})

//////////// Getting user data from Data Base. ////////////////
// app.get('/login', async (req, res) => {
//     console.log(req.body)
//     let uData = await userRec.find({ username: username }).lean();
//     console.log(uData)
//     res.json(uData);
// })

//////////// Deleting the data from Data Base. ////////////////
app.post('/delete', async (req, res) => {
    console.log(req.body)
    await toDo.deleteOne(req.body)
    res.status(204).redirect('../home/home.html')
})

app.listen(port, () => {
    console.log(`This app is listening at http://localhost:${port}`)
})