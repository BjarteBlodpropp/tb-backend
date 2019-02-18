const fs = require('fs')

/*const dotEnvExists = fs.existsSync('.env')
if (dotEnvExists) {
    console.log('getEnv.js: .env exists, probably running on development environment')

    var content;
    fs.readFile('.env', function read(err, data) {
        if (err) {
            throw err;
        }
        console.log("Env content:");
        console.log(data);
    });

    process.exit()
}*/

// On Google Cloud Platform authentication is handled for us
const gcs = require('@google-cloud/storage')()

const bucketName = `tb-backend.appspot.com`
console.log(`Downloading .env from bucket "${bucketName}"`)
gcs
    .bucket(bucketName)
    .file('.env')
    .download({ destination: '.env' })
    .then(() => {
        console.info('getEnv.js: .env downloaded successfully')
    })
    .catch(e => {
        console.error(`getEnv.js: There was an error: ${JSON.stringify(e, undefined, 2)}`)
    })
