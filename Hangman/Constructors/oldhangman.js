/* Assignment on Constructos in node.js */
/* Dependencies - hangmans.js,cloze_constructors_1.js,cloze_constructors.js */
/* Programm developed by:Sangeetha Kalia */
/* cloze_constructors.js, cloze_constructors_1.js, oldhangman.js */

var myClConst = require('./cloze_constructors_1.js');

var text = "George Washington is the first President.";
var part = "_________________ is the first President.";
var cloze = "George Washington";

var useCl = new myClConst(text,cloze,part);

useCl.flashcard();
