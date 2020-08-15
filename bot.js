import Twitter from 'twitter';
import tweetLibrary from './tweetLibrary.js';
import config from './config.js';
import fs from 'fs'; 

const T = new Twitter(config);

console.log("The dog is alive");

function makeStatusRandom({statusBeginning, repeatedChar, statusEnding}) {
    const repetitions = Math.floor(Math.random()*20);
    var repeatedCharBuffer = '';
    for(var i = 0; i < repetitions; i++){
        if (Math.random() > 0.5) {
            repeatedCharBuffer += repeatedChar.toUpperCase();
        } else {
            repeatedCharBuffer += repeatedChar.toLowerCase();
        }
    }
    const finalStatus = statusBeginning + repeatedCharBuffer + statusEnding;
    return finalStatus;
}

function fetchTweet(requestedTweet) {
    
    var chosenTweet;

    if (typeof(requestedTweet) === 'number') {
        chosenTweet = tweetLibrary[requestedTweet];
    }

    if (typeof(requestedTweet) === 'string') {
        tweetLibrary.map((tweet) => {
            if (tweet.action == requestedTweet) {
                chosenTweet = tweet;
            }
        });
    }

    const finalTweet = {
        action: chosenTweet.action,
        status: makeStatusRandom(chosenTweet),
        picPath: chosenTweet.picPath
    }

    return finalTweet;
}

function timedBark(action) {
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

setInterval(function() {timedBark(chooseAction())}, 1000*60*60*5);

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