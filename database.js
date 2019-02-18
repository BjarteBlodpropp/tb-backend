const mysql = require('mysql');

//let connection;

//local
/*if(process.env.ENV && process.env.ENV == "dev") {
    console.log("creating db connection for development");
    connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASS
    });
} */
console.log("creating db connection for production");
let config = {
    user: process.env.SQL_USER,
    database: process.env.SQL_DATABASE,
    password: process.env.SQL_PASSWORD,
}

if (process.env.INSTANCE_CONNECTION_NAME) {
    config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
}

console.log(config);

let connection = mysql.createConnection(config);


connection.connect(function (err) {
    if(err) {
        console.error("Error connection: " + err.stack);
        return;
    }

    console.log('Connected as thread id: ' + connection.threadId);
});

module.exports = connection;
