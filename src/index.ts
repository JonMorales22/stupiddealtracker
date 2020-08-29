import { MusiciansFriendNotifier } from './MusiciansFriendNotifier'

function index() : void {
    const notifier = new MusiciansFriendNotifier();
    notifier.doWork("musiciansFriend").then((result)=>{
        if(result)
            console.log(result);
    })
    .catch(console.error);
}

index();