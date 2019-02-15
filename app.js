const express = require('express');
const app = express();

app.get('/', function (request, response) {
    let result = {
        hey: 'test',
        eyo: 'test2'
    }

    response.send(result);
});


const server = app.listen(8080, () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log(`Example app listening at http://${host}:${port}`);
});
