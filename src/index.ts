import { MusiciansFriendNotifier } from './MusiciansFriendNotifier'
const searchList = ['guitar', 'midi', 'bass', 'controller', 'drumset', 'drums', 'percussion']

function index() : void {
    const notifier = new MusiciansFriendNotifier();
    notifier.doWork().then((result)=>{
        if(result)
            console.log('success');
    })
    .catch(console.error);
}

index();