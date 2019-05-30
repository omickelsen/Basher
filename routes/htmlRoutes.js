//dependencies
var moment = require('moment')
var db = require("../models");
const path = require(`path`);

//routes
//=========================================
module.exports = function (app) {
  app.get(`/`, function (req, res) {
    db.bashingTable.findAll({
        order: [
          ["createdAt", "DESC"]
        ],
        limit: 20
      })
      // use promise method to pass the burgers...
      .then(function (basherDB) {
        console.log(basherDB);

        for (let i = 0; i < basherDB.length; i++) {
          basherDB[i].dataValues.createdAt = moment(basherDB[i].dataValues.createdAt).format("LLL");
        }


        // into the main index, updating the page
        var hbsObject = {
          bashingTable: basherDB
        };
        return res.render("index", hbsObject);

      })

  });

};