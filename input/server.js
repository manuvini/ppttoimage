import express from'express'; // requre the express framework
import Converter from 'ppt-png';


var app = express();

// Create a server to listen at port 8080
var server = app.listen(8080, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("REST API demo app listening at http://%s:%s", host, port)
})


const converter = Converter.create({
    files:  ['input/sample.ppt'],
    output: 'output/',
    outputType: 'jpeg'
});








// Endpoint to Get a list of users
app.get('/getUsers', function(req, res){
    console.log("get user");
    const result = converter.convert();
    console.log({
        result
    });
    res.end("{ok}");
})
