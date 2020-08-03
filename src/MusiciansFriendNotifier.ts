import { MusiciansFriendAnalyzer } from './MusiciansFriendAnalyzer';
const searchList = ['guitar', 'midi', 'bass', 'controller', 'drumset', 'drums', 'percussion']

export class MusiciansFriendNotifier {
    analyzer: MusiciansFriendAnalyzer
    constructor() {
        this.analyzer = new MusiciansFriendAnalyzer(searchList);
    }

    async doWork() {
        return new Promise(async(resolve, reject) => {
            try{
                const data = await this.analyzer.getMusiciansFriendData()
                if(this.searchData(data.description)==true) {
                    this.notify()
                }
                resolve(true);
            }
            catch(e) {
                reject(e);
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

    notify() {
        console.log('notify!');
    }
}