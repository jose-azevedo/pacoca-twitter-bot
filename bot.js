// API KEY: tDmrgryPscZEPhOjtQfKnp0L0
// API SECRET KEY: 12A7ria7eSgfzUzyDt6tQg5dJFil1KwHhm42xDA5PgYs6Lxg1c
// BEARER TOKEN: AAAAAAAAAAAAAAAAAAAAAPD0FgEAAAAA8EtKxXtoZ8bscYt0qQIX0535sC8%3DC4PZNOMcrReHmvgJ5EhHWMBKUtuDN51m36ycWuMtSpQpQfEKVb

console.log("The dog is alive");

const Twitter = require('twitter');
const config = require('./config');
const fs = require('fs'); 

var T = new Twitter(config);

function barkGenerator() {
    var barkTimes = Math.floor(Math.random()*60);
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
        var params = searchLoveOrHate(event);
        bark(params);
    } else {
        console.log(`Tweet é retweet`);
        console.log(`-------------------------------------------`);
    }
});

stream.on('error', function(error) {
  throw error;
});

function searchLoveOrHate(event) {
    if(event.text.search('amo') > -1 || event.text.search('adoro') > -1 || event.text.search('eu gosto de paçoca') > -1 || event.text.search('gostoso') > -1 || event.text.search('delícia') > -1 || event.text.search('bom') > -1){
        return {
            found: true,
            picPath: 'fotos/amopacoca.jpg',
            params: {
                status: 'WOUF',
                in_reply_to_status_id: event.id_str, // Precisa ser a id_str pq o javascript não suporta um número tão grande
                auto_populate_reply_metadata: true,
                media_ids: ''
            }
        };
    } else if(event.text.search('odeio') > -1 || event.text.search('não gosto') > -1 || event.text.search('horrível') > -1 || event.text.search('ruim') > -1){
        return {
            found: true,
            picPath: 'fotos/raiva.jpg',
            params: {
                status: 'GGGRRRRRRRRRRR',
                in_reply_to_status_id: event.id_str, // Precisa ser a id_str pq o javascript não suporta um número tão grande
                auto_populate_reply_metadata: true,
                media_ids: ''
            }
        };
    } else if(event.text.search('comer') > -1 || event.text.search('comi') > -1 || event.text.search('como') > -1){
        return {
            found: true,
            picPath: 'fotos/assustado.jpg',
            params: {
                status: '...',
                in_reply_to_status_id: event.id_str, // Precisa ser a id_str pq o javascript não suporta um número tão grande
                auto_populate_reply_metadata: true,
                media_ids: ''
            }
        };
    } else {
        return {
            found: false,
            params: {
                status: barkGenerator(),
                in_reply_to_status_id: event.id_str, // Precisa ser a id_str pq o javascript não suporta um número tão grande
                auto_populate_reply_metadata: true
            }
        };
    }
}

function bark(params) {
    var replyParams = params;
    if(replyParams.found){
        var pic = fs.readFileSync(replyParams.picPath);
        T.post('media/upload', {media: pic}, function(err, media, response){
            if(!err){
                replyParams.params.media_ids = media.media_id_string;
                T.post('statuses/update', replyParams.params , function(err, data, response) {
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
        T.post('statuses/update', replyParams.params , function(err, data, response) {
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

function dogAction() {
    var status;
    var picPath;
    var actionId = Math.floor(Math.random()*10);
    
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
        
        case 9: 
            status = '#amopaçoca';
            picPath = 'fotos/profile_pic.png';
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