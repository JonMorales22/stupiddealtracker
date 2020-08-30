import { SavingsNotifier } from './SavingsNotifier'
import { AmazonNotifier } from './AmazonNotifier'

const searchList = ['guitar', 'midi', 'bass', 'controller', 'drum set', 'drums', 'percussion', 'drum', 'red']


function index() : void {
    const notifier = new SavingsNotifier(searchList, new AmazonNotifier());
    notifier.doWork(process.argv[2]).then((result)=>{
        if(result)
            console.log(result);
    })
    .catch(console.error);
}

index();