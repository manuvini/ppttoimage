var  express  = require('express'); // requre the express framework
const AWS = require('aws-sdk');
var fileupload = require('express-fileupload');
var ppt2png = require('ppt2png');
const fs = require('fs');
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');

var app = express();

app.use(fileupload());

// Create a server to listen at port 8080
var server = app.listen(8080, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("REST API demo app listening at http://%s:%s", host, port)
})

// Enter copied or downloaded access ID and secret key here
const ID = 'AKIAJXDHPGGMJ3Q6EPJA';
const SECRET = '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';

// The name of the bucket that you have created
const BUCKET_NAME = 'splodeit';



const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET,
    Bucket: BUCKET_NAME
});

let links =[];







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
            var i = 0;
            for(i=0; i< 5; i++){
                const path = './output/' +fname + '-'+ i+'.png';
                console.log(path);
                if (fs.existsSync(path)) {
                    //file exists
                    fs.readFileAsync = function fupload(path,i) {
                        return new Promise(function(resolve, reject) {
                        console.log('broo kkhv' +i +path);
                        
                        fs.readFile(path, (err, data) => {
                            console.log('bro jvhkg' +i +path);
                            if (err) throw err;
                            const params = {
                                Bucket: BUCKET_NAME, // pass your bucket name
                                Key: fname + '-'+ i+'.png', // file will be saved as testBucket/contacts.csv
                                Body: data,
                                'ACL': 'public-read'
                            };
                            s3.upload(params, function(s3Err, data) {
                                console.log('hey u');
                                if (s3Err) throw s3Err
                                console.log(`File uploaded successfully at ${data.Location}`)
                                links.push(data.Location);
                            });
                         });
                        });
                        
                    }
                    
                    
                }else{
                    i = 6;
                }
            }
            res.end( "  mhjgjyhg");
            console.log(links);
            links = [];
            
        }
    });    

    
    
})


