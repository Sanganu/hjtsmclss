function get_moviereview(mvname)
{

     this.moviename = mvname ;
     this.moviereview = function()
     {
             var omdb = require("request");
             var queryurl = "http://www.omdbapi.com/?t="+moviename+"&y=&plot=short&apikey=40e9cece";
             //console.log(queryurl);
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
                    return true;
               } //end of if
               else {
                 console.log('Error Error: ',error);
               } //end of else
            });   //end of callback
     } // end of moviereview function

}; // end of get moview review
/*Make it available in other modules */
module.exports = get_moviereview;
