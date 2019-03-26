/* Assignment:LIRI Bot - Week:10 */
/* This is for the Spotify API using constructors */
/* Coded by: Sangeetha */
/* file and dependency files
  liri.js
  constructorusage.js
  constructorkeys.js
  Usingconstructors.js */

function get_music(album_name)
{
      this.alname = album_name;
      this.id = '' ;
      this.secret = '';

      this.getmymusic = function()
      {
                var spotify = require('node-spotify-api');

                var myspotify = new spotify({
                             id: this.id,
                             secret: this.secret,
                        });

                var albumname = album_name;
                myspotify.search({type: 'track',query:albumname,limit:1},function(err,response){
                         if(err)
                         {
                           console.log(err,'Error encountered');
                         }
                        else
                         {
                          console.log('The Details of the Album');
                          console.log(`${response} - response`);
                          console.log(`${response}`)
                          console.log(`\nArtist Name: ${response.tracks.items[0].album.artists[0].name}`);
                          console.log(`\nAlbum Name: ${response.tracks.items[0].name}`);
                          console.log(`\nURL: ${response.tracks.items[0].external_urls.spotify}`)
                          console.log(`\n`);
                        } //end of else if

                 });//end of myspotify callback

      } //End of getmymusic
}// End of constructor get music
/*Make it available in other modules */
module.exports = get_music;
