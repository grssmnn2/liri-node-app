require("dotenv").config();
var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// user request is going to be accessible from index 2 (user will type in feels/weather/time here)
var userRequest = process.argv[2];

// use a switch or if statement, switch is another way to write lots of if statements
switch(userRequest){
    // if request === tweets, 
    case "my-tweets":
    // show last 20 tweets and when they were posted
    // then stop
    break;
    // if request===spotify song
    case "spotify-this-song":
    // show artist, song name, preview song link from spotify, album song is from
    // default song is "the sign" by ace of base
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

// DO NOT FORGOT TO LINK TO PORTFOLIO AND ADD README