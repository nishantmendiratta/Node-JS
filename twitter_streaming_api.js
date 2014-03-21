var Twit = require('twit')

var T = new Twit({
    consumer_key:         '...'
  , consumer_secret:      '...'
  , access_token:         '...'
  , access_token_secret:  '...'
})

var request = T.stream('statuses/filter', { track: 'bieber' })

request.on('tweet', function (tweet) {
  console.log(tweet.text);
  console.log("\n");
})

request.end(); 

