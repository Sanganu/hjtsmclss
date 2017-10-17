/* Assignment:LIRI Bot - Week:10 */
/* Main Program - to validate the input parameters and call the respective application */
/* Coded by: Sangeetha */
/* This application uses Constructors and inquirer */
/* file and dependency files
  liri.js
  constructorusage.js
  constructorkeys.js
  Usingconstructors.js */

callaction();

function callaction()
{
     var getinput = require('inquirer');
     var cont;
     var album;
     var movie;

     getinput.prompt([
         {
           type: 'list',
           message:'Select',
           choices:['Twitter','Spotify','Movie Review'],
           name:'listchoice',
         }
     ]).then(function(result){


         if(result.listchoice === 'Twitter')
         {
               getalltweets();

         }
         else if(result.listchoice === 'Spotify')
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
                        album = 'I want it that way'
                       }
                       else {
                          album = entry.inputalname;
                       }
                     getallmusic(entry.inputalname);
                      return (cont = true);
                 });
         }
         else if(result.listchoice === 'Movie Review')
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
                           movie = 'Bajirao Mastani'
                       }
                       else {
                          movie = entry.inputmvname;
                       }
                    getallreview(entry.inputmvname);
                     return (cont = true);
                 });

         }

     }).then(function(nextstep)
     {
       console.log('Next step',nextstep.cont);
       toContinue();
     }).catch(function(error){
        console.log("Error: ",error);
     });
} //end spotify



/* Twitter call */
function getalltweets()
{
     var gettw = require("./constructorkeys.js");
     var  mytwitter = new gettw();
        mytwitter.getmytweets();

    //toContinue();
}
/* Spotify call */
function getallmusic(album)
{
      var gmusic = require('./Usingconstructors.js');
      var mymusic = new gmusic(album);
      mymusic.getmymusic();
      //toContinue();
}
/* Movie Review */
function getallreview(movie)
{
      var gmvreview = require('./constructorusage.js');
      var mymovie = new gmvreview(movie);
       mymovie.moviereview();

    //  toContinue();
}

/* Function to continue */

function toContinue()
{
    var entry = require('inquirer');
    entry.prompt([
         {
           type:'confirm',
           message:'Do you want to exit application',
           name:'cont'
         }
    ]).then(function(action){
        if(!action.cont)
        {
           callaction();
        }
    }).catch(function(error){
         console.log('Oops: Error');
    });
}
