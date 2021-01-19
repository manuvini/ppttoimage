var  express  = require('express'); // requre the express framework

var fileupload = require('express-fileupload');
var ppt2png = require('ppt2png');

var app = express();

app.use(fileupload());

// Create a server to listen at port 8080
var server = app.listen(8080, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("REST API demo app listening at http://%s:%s", host, port)
})











// Endpoint to Get a list of users
app.post('/upload', function(req, res, next){
    console.log(req.files);
    const file = req.files.ppt;
    file.mv ('./input/1' + file.name, function(err,result){

    });
    ppt2png('./input/1' + file.name, './output/' + file.name, function( err ){
        if(err) {
            console.log(err);
        } else {
            console.log('convert successful.');
        }
    });    
    res.end("{ok}");
})



