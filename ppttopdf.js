var exec = require('child_process').exec,
    fs = require('fs');



var pdf2png = function(input, output, callback) {
  exec('convert -resize 1200 -density 200 ' + input + ' ' + output+'.png', 
    function (error, stdout, stderr) {
      if (error) {
        callback(error);
      } else {
        callback(null);
      }
    });
}



module.exports = pdf2png;
