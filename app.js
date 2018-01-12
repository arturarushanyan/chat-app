const express = require('express');
const app = express();
const rooms = require('./data/rooms');

app.set('views', './views');
app.set('view engine', 'jade');

app.use(express.static('public'));
app.use(express.static('node_modules/bootstrap/dist'));

app.get('/', (req, res) => {
    res.render('index', {title: "Home"});
});

app.get('/admin/rooms', (req, res) => {
    res.render('rooms', {
        title: "Rooms",
        rooms: rooms
    });
});

app.listen(3000, (err) => {
   if(err) throw err;
   console.log('server is running on 3000');
});