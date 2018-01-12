const express = require('express');
const router = express.Router();
const uuID = require('node-uuid');
const _ = require('lodash');
let rooms = require('./data/rooms');


router.get('/', (req, res) => {
    res.render('index', {title: "Home"});
});

router.get('/rooms', (req, res) => {
    res.render('rooms', {
        title: "Rooms",
        rooms: rooms
    });
});


//editing a chat room
router.route('/rooms/edit/:id')
    .all((req, res, next) => {
        let roomId = req.params.id;
        let room = _.find(rooms, r => r.id === roomId);
        if(!room){
            res.sendStatus(404);
            return;
        }
        res.locals.room = room;
        next();
    })
    .get((req, res) => {
        res.render('edit'); // room is available because it's in res.locals
    })
    .post((req, res) => {
        res.locals.room.name = req.body.name;
        res.redirect(req.baseUrl + '/rooms');
    });

//deleting che chat room
router.get('/rooms/delete/:id', (req, res) => {
    let roomId = req.params.id;
    rooms = rooms.filter((room) => {
        return room.id !== roomId;
    });
    res.redirect('/rooms');
});

//adding a chat room
router.route('/rooms/add')
.get((req, res) => {
    res.render('add');
})
.post((req, res) => {
    let room = {
        name: req.body.name,
        id: uuID.v4()
    };
    rooms.push(room);

    res.redirect(req.baseUrl + '/rooms');
});

module.exports = router;