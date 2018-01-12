const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const uuID = require('node-uuid');
const _ = require('lodash')
let rooms = require('./data/rooms');

app.set('views', './views');
app.set('view engine', 'jade');

//middleware's setup
app.use(express.static('public'));
app.use(express.static('node_modules/bootstrap/dist'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render('index', {title: "Home"});
});

app.get('/admin/rooms', (req, res) => {
    res.render('rooms', {
        title: "Rooms",
        rooms: rooms
    });
});

//adding a chat room
app.get('/admin/rooms/add', (req, res) => {
    res.render('add');
});

//editing a chat room
app.get('/admin/rooms/edit/:id', (req, res) => {
    let roomId = req.params.id;
    let room = _.find(rooms, r => r.id === roomId);
    if(!room){
        res.sendStatus(404);
        return;
    }
    res.render('edit', {room});
});
app.post('/admin/rooms/edit/:id', (req, res) => {
    let roomId = req.params.id;
    let room = _.find(rooms, r => r.id === roomId);
    room.name = req.body.name;
    res.redirect('/admin/rooms');
});

//deleting che chat room
app.get('/admin/rooms/delete/:id', (req, res) => {
    let roomId = req.params.id;
    rooms = rooms.filter((room) => {
        return room.id !== roomId;
    });
    res.redirect('/admin/rooms');
});

app.post('/admin/rooms/add', (req, res) => {
    let room = {
        name: req.body.name,
        id: uuID.v4()
    };
    rooms.push(room);

    res.redirect('/admin/rooms');
});

app.listen(3000, (err) => {
   if(err) throw err;
   console.log('server is running on 3000');
});