// Imports the Google Cloud client library
const {ErrorReporting} = require('@google-cloud/error-reporting');


const errors = new ErrorReporting({
    projectId: 'fichi-305623',
    reportMode: 'always',
    keyFilename: './fichi-305623-4825106edb8f.json',
  });

errors.sendMessage = function (message) {
    errors.report(message);
}

module.exports = { errors };
