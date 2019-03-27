# hjtsmclss

Folder: Myamazon.

Amazon inspired shopping application at command line using node.js.
Mysql, inquire, arrays.

"myamazon.js" runs the application from Users/Customers perspective. Items which low in quantity are not displayed. Accepting Orders and checking the orders don't exceed the available quantity. The users are provided with options to order more items or to check out. While exiting the application the list of orders are displayed.

!["Myamazon - Customer](link)

"myamazon.js" runs the application from manager level. Where he can see the Catalogue. Check items which are below a specific level of inventory. Add more items to the Inventory. Add more products to the catalogue.
![Myamazon - Manager](link)

Folder: Hangman

Inquirer
Constructors
Looping thru and managing asynchronous execution flow.

"hangman.js" is a fun applcation which displays few questions about Presidents.
The Response is case senitive, exact match is expected. 
The user is asked whether he would like to proceed with the game at each level. When the user exits the application or when questions are done, Summary of the total questions, Questions attempted, How many questions the user answered right are displayed. For each question the user has 5 tries. The 'Constructors' folder contain other versions created during development.
!["Hangman App"](link)


Folder: liribot
File name to run: liriv2.js
Command prompt: node liriv2.js my-tweets


This application uses Inquirer & fs.
API calls to Twitter, Spotify, Omdbi. 

"dotenv" pacakge is used to twitter and spotify keys.
Valid twitter api keys and spotify api keys are needed to use this app. 

node liriv2.js my-tweets

Displays last 20 tweets, if you have less than 20 tweets it displays them. 
node liriv2.js spotify-this-song I want it that way
Details of the album
node liriv2.js movie-this Bajirao Mastani
Details and rating of the movie
node liriv2.js do-what-it-says
Reads a file and does the operation.
The folder contains the other versions in development.liri.js uses constructors.

!["Liribot"](link)

