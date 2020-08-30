import { AmazonNotifier } from './AmazonNotifier';
import { IAnalyzer } from './IAnalyzer';
import { MusiciansFriendAnalyzer } from './MusiciansFriendAnalyzer';
import { GuitarCenterAnalyzer } from './GuitarCenterAnalyzer';
import { HttpClient } from './HttpClient'
import { CheerioParser } from './CheerioParser'

const searchList = ['guitar', 'midi', 'bass', 'controller', 'drum set', 'drums', 'percussion', 'drum']

export class SavingsNotifier {
    notifier: AmazonNotifier
    constructor() {
        this.notifier = new AmazonNotifier();
    }

    async doWork(target: string) {
        const analyzer = this.getAnalyzer(target);
        return new Promise(async(resolve, reject) => {
            try{
                const data = await analyzer.getData()
                console.log(JSON.stringify(data,null, 2));
                if(this.searchData(data.description)||this.searchData(data.title)) {
                    return resolve("THE BEACON IS LIT!!! GONDOR CALLS FOR AID!");
                }

                return resolve("No notification Sadge :(");
            }
            catch(e) {
                return reject(e);
            }
        })
    }

    getAnalyzer(target: string) : IAnalyzer {
        switch(target){
            case Analyzers.GuitarCenter:
                return new GuitarCenterAnalyzer(new HttpClient(), new CheerioParser());
            case Analyzers.MusiciansFriend:
            default:
                return new MusiciansFriendAnalyzer(new HttpClient(), new CheerioParser());
        }
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

enum Analyzers{
    MusiciansFriend = "MusiciansFriend",
    GuitarCenter = "GuitarCenter"
}