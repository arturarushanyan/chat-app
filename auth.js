const express = require('express');
const router = express.Router();
const passport  =require('passport');
const _ = require('lodash');
let users = require('./data/users');


router.route('/login')
    .get((req, res) => {
        // automatically logging in if env is development
        //cannot logout in this case
        if (req.app.get('env') === 'development'){
            let user = users[0];
            // functionallity for loggin in with current user with query username
            if(req.query.user){
                user = _.find(users, u => u.name === req.query.user)
            }
            req.logIn(user, (err) => {
                if(err){
                    next(err);
                }
                return res.redirect('/');
            });
            return;
        }
        res.render('login')
    })
    .post(passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

module.exports = router;

