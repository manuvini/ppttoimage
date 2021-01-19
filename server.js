var  express  = require('express'); // requre the express framework

var ppt2png = require('ppt2png');

var app = express();

// Create a server to listen at port 8080
var server = app.listen(8080, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("REST API demo app listening at http://%s:%s", host, port)
})











// Endpoint to Get a list of users
app.get('/getUsers', function(req, res){
    console.log("get user");
    ppt2png('./input/sample.ppt', './output/img', function( err ){
        if(err) {
            console.log(err);
        } else {
            console.log('convert successful.');
        }
    });    
    res.end("{ok}");
})



