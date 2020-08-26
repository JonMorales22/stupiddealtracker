import { MusiciansFriendAnalyzer } from './MusiciansFriendAnalyzer';
// import { AmazonNotifier } from './AmazonNotifier';

import { SES, AWSError } from 'aws-sdk';
import { SendEmailRequest, SendEmailResponse } from 'aws-sdk/clients/ses';

const searchList = ['guitar', 'midi', 'bass', 'controller', 'drum set', 'drums', 'percussion', 'drum']

export class MusiciansFriendNotifier {
    analyzer: MusiciansFriendAnalyzer
    // notifier: AmazonNotifier
    constructor() {
        this.analyzer = new MusiciansFriendAnalyzer(searchList);
        // this.notifier = new AmazonNotifier();
    }

    async doWork() {
        return new Promise(async(resolve, reject) => {
            try{
                const data = await this.analyzer.getMusiciansFriendData()
                console.log(JSON.stringify(data,null, 2));
                if(this.searchData(data.description)||this.searchData(data.title)) {
                    await this.notify()
                    return resolve("THE BEACON IS LIT!!! GONDOR CALLS FOR AID!");
                }

                return resolve("No notification Sadge :(");
            }
            catch(e) {
                return reject(e);
            }
        })

    }

    searchData(data: string | string[]) {
        for(let i=0;i<searchList.length;i++) {
            if(data.includes(searchList[i]))
                return true;
        }
    
        return false;
    }

    async notify() {
        const ses = new SES();

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
                    // Html: {
                    //     Data: "HTML_FORMAT_BODY",
                    //     Charset: "UTF-8"
                    // }
                }
            }
        }
        return new Promise((resolve, reject) => {
            ses.sendEmail(params, (err: AWSError, data: SendEmailResponse) => {
                if (err) {
                    console.log(err, err.stack);
                    return reject(err)
                }
                else 
                    return resolve(data);
              });
        })
        // ses.sendEmail(params, (err: AWSError, data: SendEmailResponse) => {
        //     if (err) {
        //         console.log(err, err.stack);
        //         throw(err);   
        //     }
        //     else 
        //         console.log(data);
        //   });
    }
}