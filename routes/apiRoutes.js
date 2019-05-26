module.exports = function ( app ) {
    app.get( "/token", function ( req, res ) {
        res.send( process.env.API_KEY )
    } );
};


