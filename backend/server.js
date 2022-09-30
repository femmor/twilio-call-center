const dotenv = require('dotenv');
dotenv.config();

const { PHONE_NUMBER } = require('./Twilio');

console.log(PHONE_NUMBER);
