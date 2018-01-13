const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const adminRouter = require('./admin');
const apiRouter = require('./api');
const passport  =require('passport');
const authRouter = require('./auth');
require('./passport-init');

app.set('views', './views');
app.set('view engine', 'jade');

app.use(require('./logging'));

//middleware's setup
app.use(express.static('public'));
app.use(express.static('node_modules/bootstrap/dist'));
app.use(express.static('node_modules/jquery/dist'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
// Authentification routes
app.use(authRouter);

app.use((req, res, next) => {
    if(req.isAuthenticated()){
        res.locals.user = req.user;
        next();
        return;
    }
    res.redirect('/login')
});

app.get('/', (req, res) => {
    res.render('home', {title: "Home"});
});


//Routers
app.use('/admin', adminRouter);
app.use('/api', apiRouter);

app.listen(3000, (err) => {
    if(err) throw err;
    console.log('server is running on 3000');
});