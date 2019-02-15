const express = require('express');
const app = express();

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'storsveen.rocks.mysql',
    user: 'storsveen_rocks',
    password: 'mbKesMfP1',
    database: 'storsveen_rocks',
});

connection.connect();

app.get('/', function (request, response) {
    let result = connection.query('SELECT * FROM `IntrepName`', function (err, rows, fields) {
        if(err) throw err;
        result = rows;
    });

    response.send(result);
});

app.listen(8080, () => {
    console.log('listening on port 8080');
})