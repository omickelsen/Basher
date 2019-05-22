//dependencies
var db = require("../models");
const path = require(`path`);

//routes
//=========================================
module.exports = function(app){
app.get(`/`, function(req, res){
   db.bashingTable.findAll({limit:30})
   // use promise method to pass the burgers...
   .then(function(basherDB) {
     console.log(basherDB);
     // into the main index, updating the page
     var hbsObject = { bashingTable: basherDB };
     return res.render("index", hbsObject);
     
   })
   
});

};