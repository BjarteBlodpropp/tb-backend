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
const {Storage} = require('@google-cloud/storage');
const projectId = 'tb-backend';

const storage = new Storage({
    projectId: projectId
});

const bucketName = `tb-backend.appspot.com`
console.log(`Downloading .env from bucket "${bucketName}"`)
/*gcs
    .bucket(bucketName)
    .file('.env')
    .download({ destination: '.env' })
    .then(() => {
        console.info('getEnv.js: .env downloaded successfully')
    })
    .catch(e => {
        console.error(`getEnv.js: There was an error: ${JSON.stringify(e, undefined, 2)}`)
    })
*/

const bucket = storage.bucket(bucketName);
const file = bucket.file('.env');

const localFileName = '.env';

file.createReadStream()
    .on('error', function(err) {
        console.log('err: ' + err);
        console.log('err:err');
    })
    .on('response', function (response) {
        console.log('response: ' + response);
     })
    .on('end', function() {
        console.log('file downloaded successfully');
    })
    .pipe(fs.createWriteStream(localFileName));

