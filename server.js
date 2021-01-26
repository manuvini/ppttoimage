var  express  = require('express'); // requre the express framework
var ppt2png = require('./ppttopng');
var pdf2png = require('./ppttopdf');
const fs = require('fs');
var fileupload = require('express-fileupload');
var app = express();
var exec = require('child_process').exec;

app.use(fileupload());

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});



// Create a server to listen at port 8080
var server = app.listen(8080, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("REST API demo app listening at http://%s:%s", host, port)
})

// Enter copied or downloaded access ID and secret key here
let links = [];
// Endpoint to Get a list of users
app.post('/uploadppt', function(req, res, next){
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
                const path = 'http://ec2-3-14-64-91.us-east-2.compute.amazonaws.com/' +fname + '-'+ i+'50p.jpg';
                const path2 = './output/' +fname + '-'+ i+'.jpg';
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



app.post('/uploadpdf', function(req, res, next){
    console.log(req.files);
    const file = req.files.ppt;
    
    const fname = file.name.split('.').slice(0, -1).join('.');
    file.mv ('./input/1' + file.name, function(err,result){

    });
    pdf2png('./input/1' + file.name, './output/' + fname, function( err ){
        if(err) {
            console.log(err);
        } else {
            

            console.log('convert successful.');
            for(var i=0; i< 20; i++){
                const path = 'http://13.58.42.235/' +fname + '-'+ i+'.png';
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

