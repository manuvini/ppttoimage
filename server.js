var  express  = require('express'); // requre the express framework
var ppt2png = require('./ppttopng');
var pdf2png = require('./ppttopdf');
const fs = require('fs');
const https = require('node:https');
var fileupload = require('express-fileupload');
var app = express();
var exec = require('child_process').exec;
var privateKey = fs.readFileSync( '/etc/apache2/ssl/website.key' );
var certificate = fs.readFileSync( '/etc/apache2/ssl/file1.crt' );

app.use(fileupload());

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

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
var server = https.createServer({key: privateKey,
    cert: certificate},app).listen(8080, function(){
var host = server.address().address
var port = server.address().port
console.log("REST API demo app listening at http://%s:%s", host, port)
})


//get date
const d = new Date();
      const today = new Date();
      today.setDate(d.getDate());
      const date = ("0" + today.getDate()).slice(-2);
      const month = ("0" + (today.getMonth() + 1)).slice(-2);
      const todayKey = `${date}${month}${today.getFullYear()}`;


// Enter copied or downloaded access ID and secret key here
let links = [];
// Endpoint to Get a list of users
app.post('/uploadppt', function(req, res, next){
    console.log(req.files);
    const file = req.files.ppt;
    const fname = file.name.split('.').slice(0, -1).join('.');
    file.mv ('./input/1' + file.name, function(err,result){

    });
    ppt2png('./input/1' + file.name, './output/'+ todayKey +"/" + fname, function( err ){
        if(err) {
            console.log(err);
        } else {
            console.log('convert successful.');
            for(var i=0; i< 20; i++){
                const path = 'https://upload.mobshale.com/'+ todayKey +"/"  +fname + '-'+ i+'50p.jpg';
                const path2 = './output/'+ todayKey +"/"  +fname + '-'+ i+'.jpg';
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

app.delete("/delete-folder/:folderName/:keykey", (req, res) => {
    const folderName = req.params.folderName;
    const Key = req.params.keykey;

    if(Key=="manu"){
        const folderPath = `/output/${folderName}`; // replace with the actual path to the folder you want to delete
  
        fs.rmdir(folderPath, { recursive: true }, (err) => {
          if (err) {
            res.status(500).send("Error deleting folder: " + err);
          } else {
            res.status(200).send(`Folder ${folderName} deleted successfully!`);
          }
        });
    }else{
        res.status(200).send("fuckoff: ");
    }
    

   
  });



app.post('/uploadpdf', function(req, res, next){
    console.log(req.files);
    const file = req.files.ppt;
    
    const fname = file.name.split('.').slice(0, -1).join('.');
    file.mv ('./input/1' + file.name, function(err,result){

    });
    pdf2png('./input/1' + file.name, './output/'+ todayKey +"/"  + fname, function( err ){
        if(err) {
            console.log(err);
        } else {

            console.log('convert successful.');
            for(var i=0; i< 20; i++){
                const path = 'https://upload.mobshale.com/'+ todayKey +"/"  +fname + '-'+ i+'.png';
                const path2 = './output/'+ todayKey +"/"  +fname + '-'+ i+'.png';
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

