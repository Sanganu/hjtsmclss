/* Assignment on Constructos in node.js */
/* Dependencies - hangmans.js,cloze_constructors_1.js,cloze_constructors.js */
/* Programm developed by:Sangeetha Kalia */
/* cloze_constructors.js, cloze_constructors_1.js, oldhangman.js */

function cont()
{
        if (gl_counter < 5)
        {
                var cont = require('inquirer');
                cont.prompt(
                  [
                    {
                      type:'confirm',
                      message:'Do you wish to continue game :',
                      name:'reply'
                    }
                  ]).then(function(response){
                          if(response.reply)
                          {
                            nxtquestion();
                          }
                          else {
                            console.log('\n\nYou Exited the game');
                            results();
                          }
                  });
          } //end of if
          else {
                console.log('\n\nYou finished the game!!!');
                results();
          } //end else
}

//Main Programm
console.log('US Presidents Quiz');
console.log(`Hint: George Washington,Bill Clinton,George W. Bush,Abraham Lincoln,Thomas Jefferson,Barack Obama`);

var gl_text = [
  'George Washington is the first President.',
  'Bill Clinton is the 42nd President.',
  'George W.Bush is the 43rd President',
  'Abraham Lincoln is the 16th President',
  'Thomas Jefferson is the 3rd President',
  'Barack Obama is the 44th President'
];
var gl_part = [
  '________________ is the first President.',
  '_____________ is the 42nd President.',
  '___________________ is the 43rd President',
  '_________________ is the 16th President',
  '______________ is the 3rd President',
  '_________________ is the 44th Presient'
];
var gl_cloze = [
  'George Washington',
  'Bill Clinton',
  'George W. Bush',
  'Abraham Lincoln',
  'Thomas Jefferson',
  'Barack Obama'
];
var gl_counter = -1;
var gl_right = 0;
var gl_wrong = 0 ;
var myClConst = require('./clozecards.js');

nxtquestion();
// End of Main Programm

function nxtquestion()
{
      gl_counter++;
      if ( gl_counter < 6)
      {
            var txt = gl_text[gl_counter];
            var part = gl_part[gl_counter];
            var cloze = gl_cloze[gl_counter];
            var useCl = new myClConst(txt,cloze,part);
            useCl.flashcard();
      }
      else {
          console.log("\n\nYou finished the Game.!!!");
          results();
      }
}

function results()
{
  console.log('\nTotal Questions :',6);
//  console.log('glcounter',gl_counter);
  console.log('Questions attempted',gl_right+gl_wrong);
  console.log('Right :',gl_right);
  console.log('Wrong :',gl_wrong);
}
