import { SavingsNotifier } from './SavingsNotifier'

function index() : void {
    const notifier = new SavingsNotifier();
    notifier.doWork(process.argv[2]).then((result)=>{
        if(result)
            console.log(result);
    })
    .catch(console.error);
}

index();