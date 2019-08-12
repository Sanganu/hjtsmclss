
/* Dependencies - hangmans.js,cloze_constructors_1.js,cloze_constructors.js */
/* Programm developed by:Sangeetha Kalia */
/* cloze_constructors.js, cloze_constructors_1.js, oldhangman.js */




  function ClozeCard (text,cloze,part)
  {
         this.fulltext = text;
         this.cloze = cloze;
         this.part = part;
          var mybasicO = require('./basicconstructors.js');

          this.flashcard = function()
          {
              var mybasicI = new mybasicO(part,text,cloze);
             mybasicI.displayQuestion();

           } //end flascard
  } //Clozecard

module.exports = ClozeCard ;
