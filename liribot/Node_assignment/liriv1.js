/* Assignment:LIRI Bot - Week:10 */
/* Main Program - to validate the input parameters and call the respective application */
/* Code By Sangeetha**/
/* This application take arguments in command line and performs action
 it also reads from file and based on instructions executes it */
 /* files and dependencies - liriv1.js no dependencies */
 /* Liri Version one */

// Global variables

takeaction();

function takeaction()
{
      var inputlen = process.argv.length ;
      var album;
      var movie;
      var fs = require("fs");
      if (inputlen <3)
      {
        console.log("\nInsufficient Arguments");
        console.log("\nPlease you one of the following formats");
        console.log("\n$node liriv1.js my-tweets");
        console.log("\n$node liriv1.js spotify-this-song I want it that way");
        console.log("\n$node liriv1.js movie-this Bajirao Mastani");
        console.log("\n$node liriv1.js do-what-it-says")
      }
      else
      {
                if ( process.argv[2] === 'my-tweets')
                {
                        gettweets();
                          fs.appendFile("liricommands.txt",`${process.argv[2]},`,function(error){
                            if(error)
                            {
                              console.log('Error in appending to file',error);
                            }
                          });  //End of file appending
                } //end of tweets
                 else if ( process.argv[2] === 'spotify-this-song')
                   {
                      if( inputlen === 3)
                      {
                        album = 'I want it tht way';
                      }
                      else {
                         var len = process.argv.length;
                         album ="";
                         for(var i = 3 ; i<len; i++)
                         {
                           album = album +" "+ process.argv[i];
                         }
                        album = album.trim();
                      } //end of spotify album name
                      //console.log('album',album);
                      getmusic(album);
                      fs.appendFile("liricommands.txt",`${process.argv[2]},${album},`,function(error){
                        if(error)
                        {
                          console.log('Error in appending to file',error);
                        }
                      });  //End of file appending
                  } //end of spotify
                else if( process.argv[2] === 'movie-this')
                {
                      if( inputlen === 3)
                      {
                        movie = 'Bajirao Mastani';
                      }
                      else {
                        var len = process.argv.length;
                        movie ="";
                        for(var i = 3 ; i<len; i++)
                        {
                          movie = movie + process.argv[i];
                        }
                       movie = movie.trim();
                     } //end of movie name
                       getmoviereview(movie);
                      fs.appendFile("liricommands.txt",`${process.argv[2]},${movie},`,function(error){
                        if(error)
                        {
                          console.log('Error in appending to file',error);
                        }
                      });  //End of file appending
                }
               else if ( process.argv[2] === 'do-what-it-says')
               {
                   getfilecommands();
               }
      } //end of process argv count

}

function getmusic(album_name)
{
        var spotify = require('node-spotify-api');
        var myspotify = new spotify({
                   id:'' ,
                  secret: '',
                });
        myspotify.search({type: 'track',query:album_name,limit:1},function(err,response){
                 if(err)
                 {
                   console.log(err,'Error encountered');
                 }
                 else {
                         // console.log(JSON.stringify(data,null,2));
                         console.log('\nThe Details of the Album');
                         console.log('--------------------------------------------------------------------------');
                         console.log(`\nArtist Name: ${response.tracks.items[0].album.artists[0].name}`);
                         console.log(`\nAlbum Name: ${response.tracks.items[0].name}`);
                         console.log(`\nURL: ${response.tracks.items[0].external_urls.spotify}`)
                         console.log(`\n`);
                 }
        }); //end of myspotify callback
} //end of function






function getmoviereview(mvname)
{
        var omdb = require("request");
        var queryurl = "http://www.omdbapi.com/?t="+mvname+"&y=&plot=short&apikey=40e9cece";
        console.log("Movie Review");
         console.log('--------------------------------------------------------------------------');
        omdb(queryurl, function(error, response, body) {
          if (!error && response.statusCode === 200)
          {
                console.log('Title: '+JSON.parse(body).Title);
                console.log('Director: '+JSON.parse(body).Director);
                console.log('Writer: '+JSON.parse(body).Writer);
                console.log('Rating: '+JSON.parse(body).imdbRating);
                 console.log('Actors: '+JSON.parse(body).Actors);
                 console.log('Production: '+JSON.parse(body).Production)
                 console.log('Website: '+JSON.parse(body).Website)
          }
       });
};
function gettweets()
{
         var Twitter = require('twitter');
         var mytwitter = new Twitter({
                        consumer_key : '',
                        consumer_secret : '',
                        access_token_key : '',
                      access_token_secret : ''
                    });
    mytwitter.get('statuses/user_timeline', function(error, tweets, response) {
            if (!error && response.statusCode === 200) {
                var len = 0;
                if (tweets.length > 21)
                {
                  len = 20;
                }
                else {
                  len = tweets.length;
                }
                console.log("\nTwitter Updates");
                console.log('--------------------------------------------------------------------------');

                 for (var i  =0 ; i < len ; i++)
                 {
                   var create = tweets[i].created_at;
                   var mytext = tweets[i].text;
                   console.log('\n','Tweets: ',mytext,'Date : ',create);

                 } //End of for loop

                  return true;
               }//End of if
            if (error) throw error ;
          }); //end of mytwitter callback

} //end of function gettweets

function getfilecommands()
{
        var fsr = require("fs");
        fsr.readFile("liricommands.txt","utf8",function(error,data)
        {
            if(error)
            {
              console.log("Error reading file");
            }
            else
            {
                    var content = (data.toString()).split(',');
                    if(content.length === 0)
                    {
                      console.log("File Empty");
                    }
                    else
                    {
                           console.log("Executing commands from file");
                            console.log('--------------------------------------------------------------------------');
                            for(var i = 0; i < content.length ; i++)
                            {
                                  if (content[i] === 'my-tweets')
                                  {
                                    gettweets();
                                  }
                                  else if ( content[i] === 'spotify-this-song')
                                  {
                                      getmusic(content[i+1]);
                                  }
                                  else if( content[i] === 'movie-this')
                                  {
                                      getmoviereview(content[i+1]);
                                  }
                            } //end of for loop

                    } // end of else for file content check
              }// end of else for error in readinf file
        }); //end file read
} //end of function getfilecommands
