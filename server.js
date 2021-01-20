var  express  = require('express'); // requre the express framework
var ppt2png = require('ppt2png');
const fs = require('fs');
var fileupload = require('express-fileupload');
var app = express();
app.use(fileupload());


// Create a server to listen at port 8080
var server = app.listen(8080, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("REST API demo app listening at http://%s:%s", host, port)
})

// Enter copied or downloaded access ID and secret key here
let links = [];
// Endpoint to Get a list of users
app.post('/upload', function(req, res, next){
    console.log(req.files);
    const file = req.files.ppt;
    const fname = file.name.split('.').slice(0, -1).join('.');
    file.mv ('./input/1' + file.name, function(err,result){

    });
    ppt2png('./input/1' + file.name, './output/' + fname, function( err ){
        if(err) {
            console.log(err);
        } else {
            console.log('convert successful.');
            for(var i=0; i< 20; i++){
                const path = 'http://52.14.131.94/' +fname + '-'+ i+'.png';
                const path2 = './output/' +fname + '-'+ i+'.png';
                console.log(path);
                if (fs.existsSync(path2)) {
                    links.push(path);                       
                }else{
                    i = 21;
                }
            }
            console.log(links);
            res.send(JSON.stringify(links));
            links = [];
        }
    });    

    
    
})


