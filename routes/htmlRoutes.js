//dependencies

const path = require(`path`);

//routes
//=========================================
module.exports = function(app){
app.get(`/`, function(req, res){
    res.sendFile(path.join(__dirname, `../public/index.html`));

});

};