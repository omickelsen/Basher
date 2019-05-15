// server.js this file is the initial starting point for the Node/Express server.

// Dependencies

const express = require(`express`);
const bodyParser = require(`body-parser`);

//=========================================

const app = express();
const PORT = process.env.PORT || 3000;


// Requiring models for syncing

const db = require(`./models`);

// sets up the express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//static directory
app.use(express.static(`public`));

// Set Handlebars.

const exphbs = require(`express-handlebars`);
app.engine(`handlebars`, exphbs({ defaultLayout: `main`}));
app.set(`view engine`, `handlebars`);

//import routes and give the server access to them.

//routes

//===============================================
require(`./routes/htmlRoutes`)(app);
require(`./routes/apiRoutes`)(app);

//syncing sequelize models and then starting Express app

//===========================================================

db.sequelize.sync({ force: true}).then(function(){
    app.listen(PORT, function(){
        console.log(`App listening on PORT ` + PORT);
        
    });
});