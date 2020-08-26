// Load the AWS SDK for Node.js
import { SES, AWSError } from 'aws-sdk';
import { SendEmailRequest, SendEmailResponse } from 'aws-sdk/clients/ses';
// Set the region 
// AWS.config.update({region: 'us-east-1'});

export class AmazonNotifier {
      ses;
      constructor() {
          this.ses = new SES();
      }

      async sendEmail() {
          try {
            return new Promise((resolve, reject) => {
              this.ses.sendEmail(params, (err: AWSError, data: SendEmailResponse) => {
                  if (err) {
                      console.log(err, err.stack);
                      return reject(err)
                  }
                  else 
                      return resolve(data);
                });
          })
          }
          catch(e) {
            throw e;
          }
      }
  }

// Create sendEmail params 
const params: SendEmailRequest = {
  Source: "jonmorales2.718@gmail.com",
  Destination: {
      ToAddresses: [
          "jonmorales22@gmail.com"
      ]
  },
  Message: {
      Subject: {
          Data: "Musicians Friend Tracker",
          Charset: "UTF-8"
      },
      Body: {
          Text: {
              Data: "We found something you're looking for!",
              Charset: "UTF-8"
          }
      }
  }
}