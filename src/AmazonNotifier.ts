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

      async notify( data: StupidDealData) {
          try {
            return new Promise((resolve, reject) => {
              const params = this.createEmailRequest(data);
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

      createEmailRequest(data: StupidDealData) : SendEmailRequest {
        return {
          Source: "jonmorales2.718@gmail.com",
          Destination: {
              ToAddresses: [
                  "jonmorales22@gmail.com"
              ]
          },
          Message: {
              Subject: {
                  Data: `Musicians Friend Tracker - ${data.title}`,
                  Charset: "UTF-8"
              },
              Body: {
                  Text: {
                      Data: JSON.stringify(data, null, 2),
                      Charset: "UTF-8"
                  }
              }
          }
        }
      }
  }