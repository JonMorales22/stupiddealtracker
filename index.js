const axios = require('axios');
const cheerio = require('cheerio');
const moneyRegex = new RegExp('\\${1}\\d*\.{1}\\d{2}', 'i')
const searchList = ['guitar', 'midi', 'bass', 'controller', 'drumset', 'drums', 'percussion']
async function fetchUrl(url) {
    const { data } = await axios.get(url);
    return cheerio.load(data);
}

function getPriceData($) {
    const savings = $('.feature-save').text().trim();
    const newPrice = $('.feature-price').text().trim();
    return {
        originalPrice: $('.regular-price').text().trim(),
        newPrice: moneyRegex.exec(newPrice)==null ? null : moneyRegex.exec(newPrice)[0],
        savings: moneyRegex.exec(savings) == null ? null : moneyRegex.exec(savings)[0]
    }
}

async function getMusiciansFriendData() {
    const $ = await fetchUrl('https://www.musiciansfriend.com/stupid'); 
    priceData = getPriceData($)
    return {
        'title': $('#feature-right > .feature-title').text().trim(),
        'description' : $('#feature-right > .feature-description').text().trim().toLowerCase(),
        'price': priceData
    }
}

async function MusiciansFriendNotifier() {
    const dealData = await getMusiciansFriendData();
    if(searchData(dealData.title)==true || searchData(dealData.description)==true) {
        notify();
    }
}

function searchData(data) {
    for(let i=0;i<searchList.length;i++) {
        if(data.includes(searchList[i]))
            return true;
    }

    return false;
}

function notify() {
    console.log('notify!');
}

MusiciansFriendNotifier().then(() => {
    console.log('poop');
})
.catch(console.log);
