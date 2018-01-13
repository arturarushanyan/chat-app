const fs = require('fs');
const path = require('path');

let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
module.exports = (require('morgan')('combined', {stream: accessLogStream}));