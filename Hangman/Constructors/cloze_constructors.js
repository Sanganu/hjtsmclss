/* Assignment on Constructos in node.js */
/* Dependencies - hangmans.js,cloze_constructors_1.js,cloze_constructors.js */
/* Programm developed by:Sangeetha Kalia */
/* cloze_constructors.js, cloze_constructors_1.js, oldhangman.js */

function BasicCard(front,back,ans)
{
  this.front = front;
  this.back = back;
  this.anstxt = ans;
  this.tries = 5;

    this.displayQuestion  = function()
    {
          var answer = require("inquirer");

          var that = this;

        getitright();

        function getitright()
        {

                if(that.tries > 0)
                  answer.prompt(
                    [
                      {
                        type:"input",
                        message: `${that.front}`,
                        name:"reply"
                      }
                    ]
                  ).then(function(result)
                    {
                       if( result.reply === that.anstxt)
                       {
                         console.log("You got it right....");
                         return;
                       }
                       else {
                         console.log('You missed it!!!, Number of tries remaining:',that.tries);
                         getitright();
                       }
                    }); // end of callback
                    that.tries--;
          }
      } //end of displayQuestion()
}

module.exports = BasicCard;

/*
BasicCard.prototype.displayAnswer  = function()
{
    console.log('Answer :',this.back)  ;
}
BasicCard.prototype.checkreply = function()
{
  if(inputtxt === this.)
}

*/
