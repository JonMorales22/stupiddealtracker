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
              console.log(data);
              console.log("Attempting to send email....")
              this.ses.sendEmail(params, (err: AWSError, data: SendEmailResponse) => {
                  if (err) {
                      console.error('Failed to send email :(', err, err.stack);
                      return reject(err)
                  }
                  else {
                    console.log("Succeeded in sending email!")
                    return resolve(data);
                  }
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
                  Data: `${data.source} - ${data.title}`,
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