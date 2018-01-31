// read and set environmental variables
require("dotenv").config();
var keys = require('./keys.js');

// OMDB access
var request = require('request');
// spotify access
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
// twitter access
var Twitter = require('twitter');
var client = new Twitter(keys.twitter);

// user request is going to be accessible from index 2 (user will type in tweets/song/movie here)
var userRequest = process.argv[2];

// use a switch or if statement, switch is another way to write lots of if statements
switch (userRequest) {
    // if request === tweets,
    // show last 20 tweets and when they were posted 
    case "my-tweets":
        var params = {
            screen_name: 'thisisnotcecily',
            count: 20
        };
        client.get('statuses/user_timeline', params, function (error, tweets, response) {
            if (!error) {
                for (var i = 0; i < tweets.length; i++) {
                    console.log(tweets[i].text + tweets[i].created_at);
                }
            }
        });
        // then stop
        break;
    // if request===spotify song
    case "spotify-this-song":
        // show artist, song name, preview song link from spotify, album song is from
        // default song is "the sign" by ace of base
        spotify.search({ type: 'track', query: process.argv[3] }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }else {
            var info = data.tracks.items[0];
            console.log("Song: " + info.name + " Artist: " + info.artists[0].name
                + " Album: " + info.album.name + " Preview URL: " + info.preview_url);
            };
        });
        // then stop
        break;
    // if request===movie
    case "movie-this":
        // * Title of the movie.
        // * Year the movie came out.
        // * IMDB Rating of the movie.
        // * Rotten Tomatoes Rating of the movie.
        // * Country where the movie was produced.
        // * Language of the movie.
        // * Plot of the movie.
        // * Actors in the movie.
        // default is Mr. Nobody
        // then stop
        break;
    case "do-what-it-says":
        // do something
        // take text in random.txt and call a LIRI command
        // then stop
        break;

    default:
        console.log("I'm sorry, I'm not smart enough.");

}

// DO NOT FORGET TO LINK TO PORTFOLIO AND ADD README