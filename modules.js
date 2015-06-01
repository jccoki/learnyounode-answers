// vim: expandtab ts=2 sw=2
module.exports = function(path, extn, callback){
  var fs = require('fs')
  var list = [];

  fs.readdir(path, function(err, files){
    //console.log("process 1");
    if (err) return callback(err) // early return;

    for(var ndx in files){
      if(files[ndx].indexOf('.'+extn) != -1){
        list.push(files[ndx])
      }
    }

    callback(null, list)
  })
}
