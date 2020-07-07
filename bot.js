// API KEY: tDmrgryPscZEPhOjtQfKnp0L0
// API SECRET KEY: 12A7ria7eSgfzUzyDt6tQg5dJFil1KwHhm42xDA5PgYs6Lxg1c
// BEARER TOKEN: AAAAAAAAAAAAAAAAAAAAAPD0FgEAAAAA8EtKxXtoZ8bscYt0qQIX0535sC8%3DC4PZNOMcrReHmvgJ5EhHWMBKUtuDN51m36ycWuMtSpQpQfEKVb

console.log("The dog is alive");

var Twitter = require('twitter');
var config = require('./config');

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

T.get('search/tweets', { q: 'paçoca since:2020-05-02', count: 1 }, function(err, data, response) {
    var tweets = data.statuses;
    
    for(var i = 0; i < tweets.length; i++){
        console.log(tweets[i].text);
        console.log(tweets[i].user.screen_name);
        var replyTo = tweets[i].user.screen_name;
        var replyId = tweets[i].id;
        var replyId_str = tweets[i].id_str;
        console.log('Tweet ID: ' + tweets[i].id);
        console.log('Tweet ID_STR: ' + tweets[i].id_str);
        bark(replyTo, replyId, replyId_str);
        console.log(tweets[i].created_at);
   }
});

function bark(barkTo, barkToId, barkToIdStr) {
    var params = { 
        status: '@' + barkTo +  ' ' + barkGenerator(),
        in_reply_to_status_id: barkToIdStr,
        //in_reply_to_status_id_str: barkToIdStr,
        auto_populate_reply_metadata: true
    };
    console.log(params);
    T.post('statuses/update', params , function(err, data, response) {
        if(!err){
            console.log('Tuitado');
            //console.log(data);
            console.log(data.text);
            console.log(data.id);
            console.log(data.id_str);
            console.log(data.in_reply_to_status_id);
            console.log(data.in_reply_to_status_id_str);
        } else {
            console.log(err);
        }
    });
}
//bark();
//setInterval(bark, 1000*60*10);
