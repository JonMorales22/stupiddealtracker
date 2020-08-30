// Load the AWS SDK for Node.js
import { SES, AWSError } from 'aws-sdk';
import { INotifier } from './INotifier'
import { SendEmailRequest, SendEmailResponse } from 'aws-sdk/clients/ses';

export class AmazonNotifier implements INotifier {
      ses: SES;
      constructor() {
          this.ses = new SES();
      }

      async notify( data: SavingsData) {
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

      createEmailRequest(data: SavingsData) : SendEmailRequest {
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