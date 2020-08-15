import Twitter from 'twitter';
import tweetLib from './tweetLibrary.json';
import config from './config.js';
import fs from 'fs'; 

const T = new Twitter(config);

console.log("The dog is alive");

function makeStatusRandom(tweetChar) {
    const repetitions = Math.floor(Math.random()*15);
    var tweetStatus = '';
    for(var i = 0; i < repetitions; i++){
        if (Math.random() > 0.5) {
            tweetStatus += tweetChar.toUpperCase();
        } else {
            tweetStatus += tweetChar.toLowerCase();
        }
    }
    tweetStatus += tweetChar;
    return tweetStatus;
}

function fetchTweet(requestedTweet) {
    const tweetLibrary = [
        {
            action: 'sleep',
            status: 'ZZzzzZZZz' + makeStatusRandom('z') + '.....',
            picPath: 'fotos/dormindo.jpg'
        },
        {
            action: 'bored',
            status: 'Meh',
            picPath: 'fotos/tedio.jpg'
        },
        {
            action: 'pee',
            status: '*xiii' + makeStatusRandom('i') + 'iii*',
            picPath: 'fotos/xixi.jpg'
        },
        {
            action: 'angry',
            status: 'GRRR' + makeStatusRandom('r'),
            picPath: 'fotos/raiva.jpg'
        },
        {
            action: 'greet',
            status: 'WOUF',
            picPath: 'fotos/deboa.jpg'
        },
        {
            action: 'swim',
            status: 'WOSH' + makeStatusRandom('h'),
            picPath: 'fotos/nadando.jpg'
        },
        {
            action: 'ehmole',
            status: 'ehmole kkkkkk' + makeStatusRandom('k'),
            picPath: 'fotos/ehmole.jpg'
        },
        {
            action: 'sad', 
            status: '*cãin*',
            picPath: 'fotos/triste.jpg'
        },
        {
            action: 'poo',
            status: makeStatusRandom('.'),
            picPath: 'fotos/cagando.png'
        },
        {
            action: '#amopacoca',
            status: '#amopaçoca',
            picPath: 'fotos/profile_pic.png'
        },
        {
            action: 'dive',
            status: '*TCHBU' + makeStatusRandom('u') + 'M*',
            picPath: 'fotos/tchbum.jpg'
        },
        {
            action: 'lick',
            status: '*slip*',
            picPath: 'fotos/lambida.jpg'
        },
        {
            action: 'scratch',
            status: 'unhe' + makeStatusRandom('e'),
            picPath: 'fotos/coçada.jpg'
        },
        {
            action: 'cold',
            status: 'BBRR' + makeStatusRandom('r'),
            picPath: 'fotos/neve.jpg'
        },
        {
            action: 'highfive',
            status: 'AU',
            picPath: 'fotos/highfive.jpg'
        },
        {
            action: 'scared',
            status: makeStatusRandom('.'),
            picPath: 'fotos/assustado.jpg'
        },
        {
            action: 'love',
            status: makeStatusRandom('WOUF'),
            picPath: 'fotos/amopacoca.jpg'
        },
        {
            action: 'bark',
            status: makeStatusRandom('AU'),
            picPath: ''
        }
    ]

    console.log(`Tweet requisitado: ${requestedTweet}`)
    if (typeof(requestedTweet) === 'number') {
        return tweetLibrary[requestedTweet];
    }

    if (typeof(requestedTweet) === 'string') {
        
        console.log(`Parâmetro é uma string`)
        var chosenTweet;
        tweetLibrary.map((tweet) => {
            if (tweet.action == requestedTweet) {
                chosenTweet = tweet;
            }
        });
        return chosenTweet
    }
}

function regularBark(action) {
    var pic = fs.readFileSync(action.picPath);
    T.post('media/upload', {media: pic}, function(err, media, response){
        if(!err){
            var params = { 
                status: action.status,
                media_ids: media.media_id_string
            };
            
            T.post('statuses/update', params , function(err, data, response) {
                if(!err){
                    console.log('Comportamento tuitado');
                    console.log(`-------------------------------------------`);
                } else {
                    console.log(err);
                }
            });
        } else {
            console.log(err);
        }
    });
}

function chooseAction() {
    const actionId = Math.floor(Math.random()*14);
    
    const chosenAction = fetchTweet(actionId);

    console.log(`Ação escolhida: ${actionId}`);

    return chosenAction;
}

setInterval(function() {regularBark(chooseAction())}, 1000*60*60*5);

var stream = T.stream('statuses/filter', {track: 'paçoca,@pacoca_acaxorra'});
stream.on('data', function(event) {
    console.log(event && event.text);
    if(!event.retweeted_status){
        const {  replyTweet, foundReaction } = decideReaction(event.text);
        bark(event, replyTweet, foundReaction);
    } else {
        console.log(`Tweet é retweet`);
        console.log(`-------------------------------------------`);
    }
});

stream.on('error', function(error) {
  throw error;
});

function getTweet(action) {
    var chosenTweet;
    tweetLibrary.map((tweet, index) => {
        if (tweet.action == action) {
            chosenTweet = tweet;
        }
    });
    return chosenTweet;
}

function decideReaction(tweetText) {
    if(tweetText.search('amo') > -1 || tweetText.search('adoro') > -1 || tweetText.search('eu gosto de paçoca') > -1 || tweetText.search('gostoso') > -1 || tweetText.search('delícia') > -1 || tweetText.search('bom') > -1){
        return {
            foundReaction: true,
            replyTweet: fetchTweet('love')
        };
    } else if(tweetText.search('odeio') > -1 || tweetText.search('não gosto') > -1 || tweetText.search('horrível') > -1 || tweetText.search('ruim') > -1){
        return {
            foundReaction: true,
            replyTweet: fetchTweet('angry')
        };
    } else if(tweetText.search('comer') > -1 || tweetText.search('comi') > -1 || tweetText.search('comendo') > -1){
        return {
            foundReaction: true,
            replyTweet: fetchTweet('scared')
        };
    } else if(tweetText.search('@pacoca_acaxorra') > -1){
        return {
            foundReaction: true,
            replyTweet: fetchTweet('highfive')
        };
    } else {
        return {
            foundReaction: false,
            replyTweet: fetchTweet('bark')
        };
    }
}

function bark(event, reactionParams, foundReaction) {

    var statusParams = {
        status: reactionParams.status,
        in_reply_to_status_id: event.id_str, // Precisa ser a id_str pq o javascript não suporta um número tão grande
        auto_populate_reply_metadata: true
    }

    console.log(reactionParams);

    if(foundReaction){
        var pic = fs.readFileSync(reactionParams.picPath);
        T.post('media/upload', {media: pic}, function(err, media, response){
            if(!err){
                statusParams.media_ids = media.media_id_string;
                T.post('statuses/update', statusParams , function(err, data, response) {
                    if(!err){
                        console.log(`Bark: ${data.text}`);
                        console.log(`Barking to tweet ID: ${data.in_reply_to_status_id_str}`);
                        console.log(`-------------------------------------------`);
                    } else {
                        console.log(err);
                    }
                });
            } else {
                console.log(err);
            }
        });
    } else {
        T.post('statuses/update', statusParams , function(err, data, response) {
            if(!err){
                console.log(`Bark: ${data.text}`);
                console.log(`Barking to tweet ID: ${data.in_reply_to_status_id_str}`);
                console.log(`-------------------------------------------`);
            } else {
                console.log(err);
            }
        });
    }
}