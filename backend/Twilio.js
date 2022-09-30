const twilio = require('twilio');

class Twilio {
  phoneNumber = '+18508764501';
  phoneNumberSid = 'SK63cbf5cdfa05d641260f40c3d1b0c430';
  tokenSid = 'SK63cbf5cdfa05d641260f40c3d1b0c430';
  tokenSecret = '9R8P6Yk8pAoH1LlF6cCfs6pKAzT8f0Qk';
  accountSid = 'AC6f8f515034ffb7e8acadc7bf5d7fd7b1';
  verify = 'VA4e4406b4f7157d32426d1a69539894a8';
  client;

  constructor() {
    this.client = twilio(this.tokenSid, this.tokenSecret, {
      accountSid: this.accountSid,
    });
  }

  getTwilio() {
    this.client;
  }

  async sendVerifyAsync(to, channel) {
    const data = await this.client.verify
      .services(this.verify)
      .verifications.create({
        to,
        channel,
      });

    console.log('sendVerify:', data);
    return data;
  }
}

const instance = new Twilio();
Object.freeze(instance);

module.exports = {
  instance,
};
