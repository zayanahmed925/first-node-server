const express = require('express');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello world me')
});
const users = [
    { id: 1, name: 'rofiq', phone: 1111 },
    { id: 2, name: 'salam', phone: 2222 },
    { id: 3, name: 'borkot', phone: 3333 },
    { id: 4, name: 'jabbar', phone: 4444 }
]
app.get('/users', (req, res) => {
    console.log('query', req.query);
    if (req.query.name) {
        const search = req.query.name.toLowerCase()
        const match = users.filter(user => user.name.toLowerCase().includes(search))
        res.send(match)
    }
    else {
        res.send(users)
    }

})
app.get('/user/:id', (req, res) => {
    console.log(req.params);
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id)
    res.send(user)
});

app.post('/user', (req, res) => {
    console.log(req.body);
    const user = req.body;
    user.id = users.length + 1;
    users.push(user)
    res.send(user)
})

app.listen(port, () => {
    console.log('Listening Port', port);
})
