// API KEY: tDmrgryPscZEPhOjtQfKnp0L0
// API SECRET KEY: 12A7ria7eSgfzUzyDt6tQg5dJFil1KwHhm42xDA5PgYs6Lxg1c
// BEARER TOKEN: AAAAAAAAAAAAAAAAAAAAAPD0FgEAAAAA8EtKxXtoZ8bscYt0qQIX0535sC8%3DC4PZNOMcrReHmvgJ5EhHWMBKUtuDN51m36ycWuMtSpQpQfEKVb

console.log("The dog is alive");

const Twitter = require('twitter');
const config = require('./config');
const fs = require('fs'); 

var T = new Twitter(config);

function barkGenerator() {
    var barkTimes = Math.floor(Math.random()*120);
    const bark = 'AU'
    var barkTweet = '';
    for(var i = 0; i < barkTimes; i++){
        barkTweet += bark;
    }
    return barkTweet;
}

var stream = T.stream('statuses/filter', {track: 'paçoca'});
stream.on('data', function(event) {
    console.log(event && event.text);
    if(!event.retweeted_status){
        var replyTo = event.user.screen_name;
        var replyId_str = event.id_str;
        bark(replyTo, replyId_str);
    } else {
        console.log(`Tweet é retweet`);
        console.log(`-------------------------------------------`);
    }
});

stream.on('error', function(error) {
  throw error;
});
// '@' + barkTo +  ' ' + 
function bark(barkTo, barkToIdStr) {
    var params = { 
        status: barkGenerator(),
        in_reply_to_status_id: barkToIdStr, // Precisa ser a id_str pq o javascript não suporta um número tão grande
        auto_populate_reply_metadata: true
    };
    T.post('statuses/update', params , function(err, data, response) {
        if(!err){
            console.log(`Bark: ${data.text}`);
            console.log(`Barking to tweet ID: ${data.in_reply_to_status_id_str}`);
            console.log(`-------------------------------------------`);
        } else {
            console.log(err);
        }
    });
}

function dogAction() {
    // ações do cachorro virtual:
    // Dormir, fazer xixi, morder alguma coisa, ficar entediado
    var status;
    var picPath;
    var actionId = Math.floor(Math.random()*7);
    
    switch (actionId) {
        case 0: 
            status = 'ZZzzzZZZzzzz.....';
            picPath = 'fotos/dormindo.jpg';
            break;
        case 1: 
            status = 'Meh';
            picPath = 'fotos/tedio.jpg';
            break;
        case 2: 
            status = '*xiiiiiiiiiiiiiii*';
            picPath = 'fotos/xixi.jpg'
            break;
        case 3: 
            status = 'GRRRRRRRR';
            picPath = 'fotos/raiva.jpg';
            break;
        case 4: 
            status = 'WOUF';
            picPath = 'fotos/deboa.jpg';
            break;
        case 5: 
            status = 'WOSHH';
            picPath = 'fotos/nadando.jpg';
            break;
        case 6: 
            status = 'ehmole kkkkkk';
            picPath = 'fotos/ehmole.jpg';
            break;
        case 7: 
            status = '*cãin*';
            picPath = 'fotos/triste.jpg';
            break;
        case 8: 
            status = '...';
            picPath = 'fotos/cagando.png';
            break;
        
        default:
            status = 'WOUF';
            picPath = 'fotos/deboa.jpg';
            break;
    }

    console.log(`Ação escolhida: ${actionId}`);

    return action = {
        status: status,
        picPath: picPath
    };
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

setInterval(function() {regularBark(dogAction())}, 1000*60*60*2);