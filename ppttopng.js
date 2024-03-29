var exec = require('child_process').exec,
    fs = require('fs');


var ppt2png = function(input, output, callback) {
  exec('unoconv -f pdf -o ' + output + '.pdf ' + input, 
    function( error, stdout, stderr) {
      if (error) {
        callback(error);
        return;
      }

      pdf2png(output+'.pdf', output, function(err){
        fs.unlink(output+'.pdf', function(err) {
          if(err) {
            console.log(err);
          }

        });
        callback(err);       
      });
    });
}

var pdf2png = function(input, output, callback) {
  var ekr = null;
  exec('convert -resize 1024 -density 100 ' + input + ' ' + output+'.jpg', 
    function (error, stdout, stderr) {
      if (error) {
        callback(error);
      } else {
        for(var i=0; i< 20; i++){
          const path = output + '-'+ i;
          const path2 = output + '-'+ i+'.png';
          if(fs.existsSync(path+'.jpg')){
            exec('convert '+ path + '.jpg ' + '-quality 50% '+ path + '50p.jpg', 
            function (error, stdout, stderr) {
              if (error) {
                ekr = error;
              } 
            });
          }else{
              i = 21;
          }
        }
        callback(ekr);
      }
    });
    
  }
   
  


// ppt to jpg by unoconv directly
var ppt2jpg = function(input, output) {
  exec('unoconv -f html -o ' + output + '/ ' + input, 
      function( error, stdout, stderr) {
        console.log('unoconv stdout: ', stdout);
        console.log('unoconv stderr: ', stderr);
        if (error !== null) {
          console.log('unoconv err: ', error);
        } else {
          exec('rm ' + output + '/*.html ' + output + '/' + output, 
            function(){
              if(error !== null) {
                console.log('rm err: ', error);
              }
            });
        }
      });
}

module.exports = ppt2png;
