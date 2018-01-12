const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const adminRouter = require('./admin');

app.set('views', './views');
app.set('view engine', 'jade');

//middleware's setup
app.use(express.static('public'));
app.use(express.static('node_modules/bootstrap/dist'));
app.use(bodyParser.urlencoded({extended: true}));

//Router
app.use('/admin', adminRouter);

app.listen(3000, (err) => {
    if(err) throw err;
    console.log('server is running on 3000');
});