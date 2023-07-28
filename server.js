const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.use('/game', express.static(path.join(__dirname, 'game')))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})