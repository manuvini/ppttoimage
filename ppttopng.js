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
  exec('convert -resize 1200 -density 200 ' + input + ' ' + output+'.png', 
    function (error, stdout, stderr) {
      if (error) {
        callback(error);
      } else {
        callback(null);
      }
    });

    for(var i=0; i< 20; i++){
      const path = output + '-'+ i;
      const path2 = output + '-'+ i+'.png';
      if (fs.existsSync(path2)) {
        exec('convert '+ path2 + ' -resize 1024x ' + path + '.jpg', 
        function (error, stdout, stderr) {
          if (error) {
            callback(error);
          } else {
            callback(null);
          }
        });
        exec('convert '+ path + '.jpg ' + '-quality 50% '+ path + '50p.jpg', 
        function (error, stdout, stderr) {
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
