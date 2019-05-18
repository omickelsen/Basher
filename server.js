// server.js this file is the initial starting point for the Node/Express server.
require('dotenv').config()
// Dependencies

const express = require(`express`);
const path = require('path');
const bodyParser = require(`body-parser`);

const Pusher = require('pusher');
//=========================================
console.log(process.env.APPID);

const pusher = new Pusher({
    appId: process.env.APPID,
    key: process.env.API_KEY,
    secret: process.env.SECRET,
    cluster: 'us3',
    encrypted: true
  });

//====================================================

const app = express();
const PORT = process.env.PORT || 9000;


// Requiring models for syncing

const db = require(`./models`);

// sets up the express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//static directory
app.use(express.static(path.join((__dirname,`public`))));

// Set Handlebars.

const exphbs = require(`express-handlebars`);
app.engine(`handlebars`, exphbs({ defaultLayout: `main`}));
app.set(`view engine`, `handlebars`);

//import routes and give the server access to them.
//=======================================================

//posting app route for pusher
app.post('/comment', function(req, res){
    console.log(`comment handler`);
    
    console.log(req.body);

    var newComment = {
      name: req.body.name,
      email: req.body.email,
      comment: req.body.comment
    }
    pusher.trigger('Basher-staging', 'new_comment', newComment);
    res.json({  created: true });
  });

//routes

//===============================================
require(`./routes/htmlRoutes`)(app);

// REQUIRING API ROUTES
require(`./routes/apiRoutes`)(app);

//syncing sequelize models and then starting Express app
module.exports = app;
//===========================================================

db.sequelize.sync({ force: true}).then(function(){
    app.listen(PORT, function(){
        console.log(`App listening on PORT ` + PORT);
        
    });
});