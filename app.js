require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const moment = require('moment');
const connection = require('./database');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/timelogs', function (request, response) {
    connection.query('SELECT * FROM timebanken.timelogs WHERE deleted_at IS NULL', function(err, res, fields) {
        if(err) throw err;
        response.json(res);
    });
});

app.get('/timelogs/:id', function (request, response) {
    const id = request.params.id;
    connection.query(`SELECT * FROM timebanken.timelogs WHERE id = ${id} AND deleted_at IS NULL`, function(err, res, fields) {
        if(err) throw err;
        response.json(res);
    });
});

app.post('/timelogs', function (request, response) {
    const user_id = request.body.user_id;
    const apply_date = request.body.apply_date;
    const type = request.body.type;
    const amount = request.body.amount;
    const comment = request.body.comment;

    connection.query(`INSERT INTO timebanken.timelogs (user_id, apply_date, type, amount, comment) VALUES (${user_id}, '${apply_date}', '${type}', ${amount}, '${comment}')`, function(err, res, fields) {
        if(err) throw err;

        response.json({status: 'SUCCESS'});
    });
});

app.put('/timelogs/:id', function (request, response) {
    const id = request.params.id;
    const user_id = request.body.user_id;
    const apply_date = request.body.apply_date;
    const type = request.body.type;
    const amount = request.body.amount;
    const comment = request.body.comment;

    connection.query(`UPDATE timebanken.timelogs SET user_id = ${user_id}, apply_date = '${apply_date}', type = '${type}', amount = ${amount}, comment = '${comment}' WHERE id = ${id} AND deleted_at IS NULL`, function(err, res, fields) {
        if(err) throw err;

        response.json({status: 'SUCCESS'});
    });
});

app.delete('/timelogs/:id', function (request, response) {
    const id = request.params.id;
    const deleted_at = moment().format('YYYY-MM-DD HH:mm');

    connection.query(`UPDATE timebanken.timelogs SET updated_at = '${deleted_at}', deleted_at = '${deleted_at}' WHERE id = ${id} AND deleted_at IS NULL`, function(err, res, fields) {
        if(err) throw err;

        response.json({status: 'SUCCESS'});
    });
});


const server = app.listen(8080, () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log(`Example app listening at http://${host}:${port}`);
});
