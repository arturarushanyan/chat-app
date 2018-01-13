const express = require('express');
const router = express.Router();
const _ = require('lodash');
const uuID = require('node-uuid');
let rooms = require('./data/rooms.json');
let messages = require('./data/messages.json');
let users = require('./data/users');

router.get('/rooms', (req, res) => {
    res.json(rooms);
});

router.route('/rooms/:roomId/messages')
    .get((req, res) => {
        let roomId = req.params.roomId;
        let roomMessages = messages
            .filter(m => m.roomId === roomId)
            .map(m => {
                let user = _.find(users, u => u.id === m.userId);
                return {text: `${user.name}: ${m.text}`}
            });
        let room = _.find(rooms, r => r.id === roomId);

        if (!room) {
            res.sendStatus(404);
            return;
        }

        res.json({
            room: room,
            messages: roomMessages
        })
    })
    .post((req, res) => {
        let roomId = req.params.roomId;
        let newMessage = {
            roomId: roomId,
            text: req.body.text,
            userId: req.user.id,
            id: uuID.v4()
        };

        messages.push(newMessage);
        res.sendStatus(200);
    })
    .delete((req, res) => {
        let roomId = req.params.roomId;
        messages = messages.filter((m) => m.roomId !== roomId);
        res.sendStatus(200);
    });


module.exports = router;