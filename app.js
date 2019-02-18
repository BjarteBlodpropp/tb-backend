require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database');

app.get('/', function (request, response) {
    connection.query('SELECT * FROM timebanken.timelogs', function(err, res, fields) {
        if(err) throw err;
        response.json(res);
    });
});


const server = app.listen(8080, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log("host:" + process.env.DB_HOST);

    console.log(`Example app listening at http://${host}:${port}`);
});
