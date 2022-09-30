const dotenv = require('dotenv');
const { ACCOUNT_SID } = require('./Twilio');

dotenv.config();

console.log(ACCOUNT_SID);
