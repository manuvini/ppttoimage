var  express  = require('express'); // requre the express framework
var ppt2png = require('./ppttopng');
var pdf2png = require('./ppttopdf');
const fs = require('fs');
var fileupload = require('express-fileupload');
var app = express();
var exec = require('child_process').exec;

app.use(fileupload());

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);



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
            for(var i=0; i< 20; i++){
                const path = output + '-'+ i;
                const path2 = output + '-'+ i+'.png';
                if (fs.existsSync(path2)) {
                  exec('convert '+ path2 + ' -resize 1024x ' + path + '.jpg', 
                  function (error, stdout, stderr) {
                    if(fs.existsSync(path2+'.jpg')){
                      exec('convert '+ path + '.jpg ' + '-quality 50% '+ path + '50p.jpg', 
                      function (error, stdout, stderr) {
                        if (error) {
                          callback(error);
                        } else {
                          callback(null);
                        }
                      });
                    }
          
                    if (error) {
                      callback(error);
                    } else {
                      callback(null);
                    }
                  });
                  
                 
                }else{
                    i = 21;
                }
            }

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

