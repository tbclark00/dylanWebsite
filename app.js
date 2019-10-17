var express = require('express');
var app = express();
var path = require('path');


app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/public/index.html')));

app.get('/ind', (req, res) => res.sendFile(path.join(__dirname + '/public/world.html')));


app.listen(8080, () => console.log('Your site listening on port 8080!'));