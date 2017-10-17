//Bamazon (inspired by) amazon
//Created by: Sangeetha K.
//mysql,express,inquirer are used.

var mysql = require('mysql');

var connection = mysql.createConnection({
host: "localhost",
port:3306,
user: "root",
password:"Mykutties2",
database:"dubootcamp"
});

var gl_catalog = [];
var gl_totalorder = [];
//Main Program
establishConnection();

function establishConnection()
{
      connection.connect(function(err)
      {
        if(err)throw err;

        //console.log('Connected :'+connection.threadId);
        displayProducts();
      }); // Database Connection establishment
}

function displayProducts()
{
  connection.query("select * from master_product where quantity > 0",function(error,results)
   {
       if(error) throw("Error Encountered!!",error);
       //console.log('The length', results.length);
       console.log("Catalogue :",JSON.stringify(results,null,2));
       for( var i =0;i < results.length ; i++)
       {
           gl_catalog.push(results[i].product_id,results[i].product_name,results[i].quantity);
       }

       //console.log('gl catalog',gl_catalog);
       confirmOrder('\nReady to Order?..');
   });
}

function confirmOrder(vtext)
{
      var getit = require ('inquirer');
      getit.prompt([
        {
          message:vtext,
          type: 'confirm',
          name: 'ordercont'
        }
      ]).then(function(result,err)
           {
                if (err) throw console.log('The Error : ',err);
                if(result.ordercont)
                {
                    placeOrder();
                }
                else {
                  connection.end;
                  displaytotalorder();
                }
           });

}


function placeOrder()
{
    var getorder = require('inquirer');
    getorder.prompt([
      {
        type:"input",
        message:"Enter Product ID: ",
        name:'pid'

      },
      {
          type:"input",
          message:"Enter Qunatity: ",
          name:'pqty',

      }
    ]).then(function(data,err){
      {
         for(var i = 0; i < gl_catalog.length; i = i+3)
         {
           var v1 = String(gl_catalog[i]);
           if(v1 === data.pid )
           {
               if ( (data.pqty) <= parseInt(gl_catalog[i+2]))
               {

                 updateTables(data.pid,data.pqty);
               }
               else {
                 console.log("\nWe do not have that much in stock for this item!!!");
                 confirmOrder('\nDo you like to order anything else');
               }
           }
          }
      }

    });
  }


  function updateTables(prodid,prodqty)
  {
         var stock
         var v2 = prodid.trim();

         //console.log(prodid);
           for(var i =0; i < gl_catalog.length ; i=i+3)
           {
              //  console.log(gl_catalog[i]);

                var v1 = String(gl_catalog[i]);
                var v3 = v1.trim();
                 if (v3 === v2)
                 {
                     stock = gl_catalog[i+2] - prodqty ;
                     gl_totalorder.push(gl_catalog[i],gl_catalog[i+1],prodqty);
                 }
           }
            var query = connection.query("update master_product set ? where ?",
                [
                  {
                    quantity : stock
                  },
                  {
                    product_id : prodid
                  }

                ], function(err,res)
                    {
                             if(err) throw err;
                             var q1 = connection.query("insert into order_products(product_id,order_qunatity) values(?,?)",
                                [
                                  prodid,prodqty
                                ],function(err,res){
                                  if(err) throw err;
                                  //console.log('Insertinto',res);
                                  confirmOrder('Order more items');

                                });
                    });
   }

function displaytotalorder()
{
    console.log('\nYour Order details');
    //console.log(gl_totalorder);
    var l1 = gl_totalorder.length ;
    if ( l1 > 0)
    {
          for(var i = 0; i < l1;i=i+3)
          {
            console.log('\nProduct ID : ',gl_totalorder[i]);
            console.log('Product Name : ',gl_totalorder[i+1]);
            console.log('Quantity Ordered : ',gl_totalorder[i+2]);
          }
    }
    else {
      console.log('No Orders made !!!!');
    }
  return ;
}
