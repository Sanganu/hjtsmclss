/* Assignment:LIRI Bot - Week:10 */
/* Main Program - to validate the input parameters and call the respective application */
/* Code By Sangeetha**/
/* This application takes arguments in command line and performs action
 it also reads commands from file and executes it */
 /* files and dependencies - liriv3.js no dependencies */
 /* Liri Version three */

// Global variables
var logfile = require('fs');

//Log file about starting the application - this errases the previos login log file session
var dtime = Date.now();
logfile.writeFile("lirilogfile.txt",`Application Started @ ${dtime}`,function(err)
{
  if (err)
  {
    console.log('Error in creating log file');
  }
});
callaction();
//Log file about exiting the application
var dtime = Date.now();
logfile.appendFile("lirilogfile.txt",`\nExiting Application  @ ${dtime}`,function(err)
{
  if (err)
  {
    console.log('Error in creating log file');
  }
});

//function
function callaction()
{

      var album;
      var movie;
      var fs = require("fs");
      var getinput = require('inquirer');
      getinput.prompt([
          {
            type: 'rawlist',
            message:'Select',
            choices:['Twitter','Spotify','Movie Review','Exit Application'],
            name:'listchoice',
          }
      ]).then(function(result)
      {
             if (result.listchoice === 1 )
                {

                        gettweets();
                        //Adding to command file for do-what-it-says
                          fs.appendFile("liricommands.txt",`${process.argv[2]},`,function(error){
                            if(error)
                            {
                              console.log('Error in appending to file',error);
                            }
                          });  //End of file appending

                } //end of tweets
                 else if (result.listchoice === 2)
                   {
                     var option = require('inquirer');
                     option.prompt([
                       {
                         type:'input',
                         message:'Enter Album Name : ',
                         name:'inputalname',
                       }
                     ]).then(function(entry){
                           console.log(entry.inputalname,'album name');
                           if( typeof entry.inputalname != 'string')
                           {
                              var album = 'I want it that way'
                           }
                           else {
                             var album = entry.inputalname;
                           }

                            getmusic(album);
                            //Adding commands to command file do-what it says
                            fs.appendFile("liricommands.txt",`${process.argv[2]},${album},`,function(error){
                              if(error)
                              {
                                console.log('Error in appending to file',error);
                              }
                            });  //End of file appending
                    }); //end of inout album name
                  } //end of spotify
                else if( result.listchoice === 3)
                {
                          var option = require('inquirer');
                          option.prompt([
                            {
                              type:'input',
                              message:'Enter Movie Name : ',
                              name:'inputmvname',
                            }
                          ]).then(function(entry){
                                console.log(entry.inputmvname,'movie name');
                                if((entry.inputmvname === 'undefined') || (entry.inputmvname === null))
                                {
                                   var movie = 'Bajirao Mastani'
                                }
                                else {
                                  var movie = entry.inputmvname;
                                }
                                  getmoviereview(movie);
                          }); //End of movie name inquirer

                       //Adding commands to command file for do what it says
                      fs.appendFile("liricommands.txt",`${process.argv[2]},${movie},`,function(error){
                        if(error)
                        {
                          console.log('Error in appending to file',error);
                        }
                      });  //End of file appending
                }
               else if ( result.listchoice === 4)
               {

                   getfilecommands();

               }
               else {
                    return;
               }
      }).catch(function(error){
         console.log("Error: ",error);
      }); //End of Inquirer
}

function getmusic(album_name)
{
        var spotify = require('node-spotify-api');
        var myspotify = new spotify({
                   id:'' ,
                  secret: '',
                });
                //Log file about placing an API call with the credentials info
                var dtime = Date.now();
                var str = `\nCall placed in Spotify API @ ${dtime} with credentials\n ${myspotify}, type:track, query:${album_name}, limit:1` ;
                logfile.appendFile("lirilogfile.txt",str,function(err)
                {
                  if (err)
                  {
                    console.log('Error in appending to log file');
                  }
                });
                //log file
        myspotify.search({type: 'track',query:album_name,limit:1},function(error,response){
                 if(error)
                 {
                   console.log(error,'Error encountered');
                       //Log file if API call encountered error
                       var dtime = Date.now();
                       logfile.appendFile("lirilogfile.txt",`\nError from  spotify API @ ${dtime} \n ${error}`,function(err)
                       {
                         if (err)

                         {
                           console.log('Error in appending to log file');
                         }
                       });
                       //log file
                 }
                 else {
                         // console.log(JSON.stringify(data,null,2));
                         console.log('\nThe Details of the Album');
                         console.log('--------------------------------------------------------------------------');
                         console.log(`\nArtist Name: ${response.tracks.items[0].album.artists[0].name}`);
                         console.log(`\nAlbum Name: ${response.tracks.items[0].name}`);
                         console.log(`\nURL: ${response.tracks.items[0].external_urls.spotify}`)
                         console.log(`\n`);
                         //Log file about the response from api call
                         var dtime = Date.now();
                         logfile.appendFile("lirilogfile.txt",`\nResponse from  spotify API @ ${dtime} \n ${response}`,function(err)
                         {
                           if (err)
                           {
                             console.log('Error in appending to log file');
                           }
                         });
                         //log file
                 }
        }); //end of myspotify callback
} //end of function






function getmoviereview(mvname)
{
        var omdb = require("request");
        var queryurl = "http://www.omdbapi.com/?t="+mvname+"&y=&plot=short&apikey=40e9cece";
        console.log("Movie Review");
         console.log('--------------------------------------------------------------------------');
         //Log file about placing an API call with the credentials info
         var dtime = Date.now();
         var str = `\nCall placed in Omdb API @ ${dtime} with credentials\n ${queryurl}`
         logfile.appendFile("lirilogfile.txt",str,function(err)
         {
           if (err)
           {
             console.log('Error in appending to log file');
           }
         });
         //log file
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
                 //Log file about response from omdbapi call
                 var dtime = Date.now();
                 logfile.appendFile("lirilogfile.txt",`\nResponse from  omdbapi API @ ${dtime} \n${response}`,function(err)
                 {
                   if (err)
                   {
                     console.log('Error in appending to log file');
                   }
                 });
                 //log file
          }
          else {
            throw error;
                //Log file about error resulted from omdbapi call
                var dtime = Date.now();
                logfile.appendFile("lirilogfile.txt",`Error from omdbapi API @ ${dtime} \n ${error}`,function(err)
                {
                  if (err)
                  {
                    console.log('Error in appending to log file');
                  }
                });
                //log file
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
                      //Log file about placing an API call with the credentials info
                    var dtime = Date.now();
                    var str = `\nCall placed in Spotify API @ ${dtime} with credentials\n ${mytwitter}, statuses/user_timeline` ;
                    logfile.appendFile("lirilogfile.txt",str,function(err)
                    {
                      if (err)
                      {
                        console.log('Error in appending to log file');
                      }
                    });
                    //log file
    mytwitter.get('statuses/user_timeline', function(error, tweets, response) {


            if (!error && response.statusCode === 200) {
                              //Log file response from twitter api
                              var dtime = Date.now();
                              logfile.appendFile("lirilogfile.txt",`\nResponse from  Twitter API @ ${dtime} \n ${tweets}`,function(err)
                              {
                                if (err)
                                {
                                  console.log('Error in appending to log file');
                                }
                              });
                              //log file
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


               }//End of if
            if (error)
            {
               throw error ;
                    //Log file about error from twitter api call
                    var dtime = Date.now();
                    logfile.appendFile("lirilogfile.txt",`\nError from  Twitter API @ ${dtime} \n ${error}`,function(err)
                    {
                      if (err)
                      {
                        console.log('Error in appending to log file');
                      }
                    });
                    //log file
            }
          }); //end of mytwitter callback

} //end of function gettweets

function getfilecommands()
{
        var fsr = require("fs");
        fsr.readFile("liricommands.txt","utf8",function(error,data)
        {
            if(error)
            {
              console.log("Error reading file",error);
              //Log file if error reulted in reading command file
              var dtime = Date.now();
              logfile.appendFile("lirilogfile.txt",`\nErrorin reading liricommands.txt file  @ ${dtime} - ${error}`,function(err)
              {
                if (err)
                {
                  console.log('Error in creating log file');
                }
              });
              //Log
            }
            else
            {
                  //Log file
                  var dtime = Date.now();
                  logfile.appendFile("lirilogfile.txt",`\nExecuting Commands liricommands.txt file  @ ${dtime} for the user selection do-what-it-says`,function(err)
                  {
                    if (err)
                    {
                      console.log('Error in creating log file');
                    }
                  });
                  //log file
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
