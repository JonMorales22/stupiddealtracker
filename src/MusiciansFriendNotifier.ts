import { MusiciansFriendAnalyzer } from './MusiciansFriendAnalyzer';
import { AmazonNotifier } from './AmazonNotifier';

const searchList = ['guitar', 'midi', 'bass', 'controller', 'drum set', 'drums', 'percussion', 'drum']

export class MusiciansFriendNotifier {
    analyzer: MusiciansFriendAnalyzer
    notifier: AmazonNotifier
    constructor() {
        this.analyzer = new MusiciansFriendAnalyzer(searchList);
        this.notifier = new AmazonNotifier();
    }

    async doWork() {
        return new Promise(async(resolve, reject) => {
            try{
                const data = await this.analyzer.getMusiciansFriendData()
                console.log(JSON.stringify(data,null, 2));
                if(this.searchData(data.description)||this.searchData(data.title)) {
                    await this.notifier.notify(data)
                    return resolve("THE BEACON IS LIT!!! GONDOR CALLS FOR AID!");
                }

                return resolve("No notification Sadge :(");
            }
            catch(e) {
                return reject(e);
            }
        })

    }

    searchData(data: string) {
        data.toLowerCase();
        for(let i=0;i<searchList.length;i++) {
            if(data.includes(searchList[i]))
                return true;
        }
    
        return false;
    }
}