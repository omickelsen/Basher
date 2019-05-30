module.exports = function ( app ) {
    app.get( "/token", function ( req, res ) {
        res.send( process.env.API_KEY )
    } );
    app.get( "/token2", function ( req, res ) {
        res.send( process.env.API_KEY2 )
    } );
};


