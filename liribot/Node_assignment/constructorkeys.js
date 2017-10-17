/* Assignment:LIRI Bot - Week:10 */
/* This is for getting the tweets using construtors*/
/* Coded by: Sangeetha */

function access_credentials()
{
    this.ckey = '';
    this.csecret = '' ;
    this.atokenkey = '' ;
    this.atokensecret = '' ;

    this.getmytweets = function()
    {
              var Twitter = require('twitter');
              var mytwitter = new Twitter({
                           consumer_key : this.ckey,
                          consumer_secret : this.csecret ,
                          access_token_key : this.atokenkey ,
                           access_token_secret : this.atokensecret
                       });
                 mytwitter.get('statuses/user_timeline',  function(error, tweets, response) {
                         if (!error && response.statusCode === 200) {
                             var len = 0;
                             if (tweets.length > 21)
                             {
                               len = 20;
                             }
                             else {
                               len = tweets.length;
                             }
                              for (var i  =0 ; i < len ; i++)
                              {
                                console.log("Twitter Updates");
                                var create = tweets[i].created_at;
                                var mytext = tweets[i].text;
                                console.log('\n',mytext,'Date : ',create);
                                console.log('\n');
                              } //End of for loop


                            }//End of if
                         if (error) throw error ;
                  }); //End of mytwitter callback
    }// End of getmytweets function

} //End of access_credentials constructor

/*Make it available in other modules */
module.exports = access_credentials ;
