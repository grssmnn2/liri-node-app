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

switch (userRequest) {
    case "my-tweets":
        myTweets();
        break;
    case "spotify-this-song":
        spotifyCall();
        break;
    case "movie-this":
        movieSearch();
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

function myTweets() {
    // show last 20 tweets and when they were posted 
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
}
function spotifyCall() {
    // show artist, song name, preview song link from spotify, album song is from
    // default song is "the sign" by ace of base
    var user = process.argv.slice(3);
    spotify.search({ type: 'track', query: user }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {
            var info = data.tracks.items[0];
            console.log("Song: " + info.name + " Artist: " + info.artists[0].name
                + " Album: " + info.album.name + " Preview URL: " + info.preview_url);
        };
    });
};

    function movieSearch() {
       
        var movie = process.argv.slice(3);
        var url = 'http://www.omdbapi.com/?apikey=trilogy&t='+ movie;
        request(url, function (error, response, body) {
            var jason = JSON.parse(body);
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode);
            console.log('Movie Information:', "Title: " + jason.Title + " Year: " + jason.Year + " IMDB Rating: "
            + jason.imdbRating + " Rotten Tomato Rating: " + jason.Ratings[1].Value + " Country: " + jason.Country + " Language: " + jason.Language + " Plot: " +
            jason.Plot + " Actors: " + jason.Actors);
        });
    };



// DO NOT FORGET TO LINK TO PORTFOLIO