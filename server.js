var  express  = require('express'); // requre the express framework
const AWS = require('aws-sdk');
var fileupload = require('express-fileupload');
var ppt2png = require('ppt2png');
const fs = require('fs');
const AWS = require('aws-sdk');

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
    secretAccessKey: SECRET
});









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
            let links = [];
            for(var i=0; i< 20; i++){
                const path = './output/' +fname + '-'+ i+'.png';
                console.log(path);
                if (fs.existsSync(path)) {
                    //file exists
                    const fileContent = fs.readFileSync(file);
                    const params = {
                        Bucket: BUCKET_NAME,
                        Key: file.name,
                        Body: fileContent
                        // CreateBucketConfiguration: {
                        //     // Set your region here
                        //     LocationConstraint: "us-east-2"
                        // }
                    };

                    s3.upload(params, function(err, data) {
                        if (err) console.log(err, err.stack);
                        console.log('file uploaded ' + file.name + "   " + data.Location);
                        links.push(data.Location);
                    });
                }else{
                    i = 21;
                }
                res.end(links);
                links = [];



            }
        
        }
    });    
    
})



