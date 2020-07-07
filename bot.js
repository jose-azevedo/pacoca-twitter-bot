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

function bark(barkTo, barkToId, barkToIdStr) {
    var params = { 
        status: '@' + barkTo +  ' ' + barkGenerator(),
        in_reply_to_status_id: barkToIdStr, // Precisa ser a id_str pq o javascript não suporta um número tão grande
        auto_populate_reply_metadata: true
    };
    console.log(`Bark: ${params.status}`);
    console.log(`Barking to tweet ID: ${params.in_reply_to_status_id}`);
    T.post('statuses/update', params , function(err, data, response) {
        if(!err){
            console.log(`Bark: ${data.status}`);
            console.log(`Barking to tweet ID: ${data.in_reply_to_status_id_str}`);
        } else {
            console.log(err);
        }
    });
}

var stream = T.stream('statuses/filter', {track: 'paçoca'});
stream.on('data', function(event) {
    console.log(event && event.text);
    var replyTo = event.user.screen_name;
    var replyId = event.id;
    var replyId_str = event.id_str;
    bark(replyTo, replyId, replyId_str);
});

stream.on('error', function(error) {
  throw error;
});



function regularBark() {
    var pic = fs.readFileSync('fotos/preguica.jpg');
    T.post('media/upload', {media: pic}, function(err, media, response){
        if(!err){
            var params = { 
                status: 'Preguicinha...',
                media_ids: media.media_id_string
            };
            
            T.post('statuses/update', params , function(err, data, response) {
                if(!err){
                    console.log('Preguiça tuitada');
                } else {
                    console.log(err);
                }
            });
        } else {
            console.log(err);
        }
    });
}

regularBark();