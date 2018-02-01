// read and set environmental variables
require("dotenv").config();
var keys = require('./keys.js');
// node package for reading and writing files
var fs = require("fs");
// OMDB access
var request = require('request');
// spotify access
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
// twitter access
var Twitter = require('twitter');
var client = new Twitter(keys.twitter);

// user request is accessible from index 2 (user will type in tweets/song/movie here)
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
        break;
    case "do-what-it-says":
        whatItSays();
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
    var user = process.argv.slice(3);
    if (process.argv[3]===undefined){
        user="the sign";
    };
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
    var movie= process.argv.slice(3);
    if (process.argv[3]===undefined){
        movie = "Mr. Nobody"; 
    }           
    var url = 'http://www.omdbapi.com/?apikey=trilogy&t=' + movie;
    request(url, function (error, response, body) {
        var jason = JSON.parse(body);
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('Movie Information:', "Title: " + jason.Title + " Year: " + jason.Year + " IMDB Rating: "
            + jason.imdbRating + " Rotten Tomato Rating: " + jason.Ratings[1].Value + " Country: " + jason.Country + " Language: " + jason.Language + " Plot: " +
            jason.Plot + " Actors: " + jason.Actors);

    });
};

function whatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }
       // Then split it by commas (to make it more readable)
        var dataArr = data.split(",").join("");
        // We will then re-display the content as an array for later use.
        console.log("$ node" + " liri.js " + dataArr);
    });
};

fs.appendFile("log.txt", process.argv.slice(2) + "\r\n",function(err){
    if(err)
      console.error(err);
    console.log('Appended!');
  });