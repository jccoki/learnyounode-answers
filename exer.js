// vim: expandtab ts=2 sw=2

// exer 1
/*
console.log('HELLO WORLD');

*/

// ==========================
// exer 2: argument parsing
/*
var args = process.argv;
var sum = 0;
var start_ndx = 2;

for(var i = start_ndx; i < args.length; i++){
  sum = sum + parseInt(args[i])
}

console.log(sum);

*/

// ==========================
// exer 3: sync string processing

/*
var fs = require('fs')
var args = process.argv
var sum = 0
var ndx = 2
var buff = fs.readFileSync(args[ndx], 'utf8')
lines = buff.split('\n').length-1

console.log(lines)
*/

// ==========================
// exer 4: async string processing

/*
var fs = require('fs')
var args = process.argv
var sum = 0
var ndx = 2
var data = ""

var buff = fs.readFile(args[ndx], 'utf8', function(err, contents){
//  console.log("process 1");

  if (err) throw err;
  lines = contents.split('\n').length-1
  console.log(lines)
})

//console.log("process 2")
*/

/*
// ==========================
// exer 5: async dir reading processing
var fs = require('fs')
var args = process.argv

var path = args[2]
var extn = '.' + args[3] 

fs.readdir(path, function(err, files){
  //console.log("process 1");

  if (err) throw err;
  for(var ndx in files){
    if(files[ndx].indexOf(extn) != -1){
      console.log(files[ndx])
    }
  }
})
// console.log("process 2")
*/

/*
// ==========================
// exer 6: modular exer 5

var module = require('./modules.js')
var args = process.argv

var path = args[2]
var extn = args[3]

module(path, extn, function(err, files){
  if(err) console.log("Error!!!");

  files.forEach(function(file){ console.log(file) })
})
*/

// console.log("process 2")

/*
// ==========================
// exer 7: http client
var http = require('http')

var req = http.get(process.argv[2], function(res) {

  res.setEncoding('utf8');
  res.on('data', function(data){
    console.log(data)
  })
  res.on('error', function(error) {
    console.log("Got error: " + error.message);
  });

})

req.on('socket', function(e){
//  console.log('socket is assigned to this request')
})

req.on('connect', function(evt){
//  console.log('respond to a request with a CONNECT method')
})
*/

/*
// ==========================
// exer 8: http collect
var http = require('http')

var req = http.get(process.argv[2], function(res) {
  var output = ''

  res.setEncoding('utf8');

  res.on('data', function(data){
    output =  output + data
  })

  res.on('end', function(){
    console.log(output.length)
    console.log(output)
  })

  res.on('error', function(error) {
    console.log("Got error: " + error.message);
  });

})

req.on('socket', function(e){
//  console.log('socket is assigned to this request')
})

req.on('connect', function(evt){
//  console.log('respond to a request with a CONNECT method')
})
*/

/*
// ==========================
// exer 9: juggling async
var http = require('http');
var bl = require('bl');
var listUrls = process.argv.slice(2);
var resultData = [];

function displayResult() {
  listUrls.forEach(function(url) {
    console.log(resultData[url]);
  });
}

function doRequest(url) {
  http.get(url, function(result) {
    result.pipe(bl(function (err, data) {
      if (err) return console.error(err);
        resultData[url] = data.toString();

      if (Object.keys(resultData).length === listUrls.length) {
        displayResult();
      }
    }))
  });
}

for (var i = 0; i < listUrls.length; i++) {
  doRequest(listUrls[i]);
}

*/

/*
// ==========================
// exer 10: TCP time server
var net = require('net');

var port = process.argv[2]

// pads leading zeroes
Number.prototype.padLeft = function(base,chr){
    var  len = (String(base || 10).length - String(this).length)+1;
    return len > 0? new Array(len).join(chr || '0')+this : this;
}

var server = net.createServer(function(socket) { //'connection' listener
  var date = new Date()
  var date_arr = [date.getFullYear(), (date.getMonth()+1).padLeft(), date.getDate()]
  var time_arr = [date.getHours().padLeft(), date.getMinutes()]

  console.log('client connected');
  socket.on('end', function() {
//    console.log('client disconnected');
  });

  socket.write(date_arr.join('-') + ' ' + time_arr.join(':') + '\r\n');

  // pipe socket data to itself?
  socket.pipe(socket);

  // close the conn
  socket.end()
});
server.listen(port);
*/

/*
// ==========================
// exer 11: HTTP FILE SERVER
var http = require('http')
var fs = require('fs')
var port = process.argv[2]

var server = http.createServer(function (req, res) {
  res.writeHead(200, { 'content-type': 'text/plain' })
  fs.createReadStream(String(process.argv[3])).pipe(res)

  req.on('error', function(err){
    console.log('request error: ' + err)
  })

  res.on('error', function(err){
    console.log('response error: ' + err)
  })
})

server.on('error', function(err){
  console.log(err)
})

server.listen(Number(port))
*/

/*
// ==========================
// exer 12: HTTP UPPERCASERER
var http = require('http');
var map = require('through2-map')
var port = process.argv['2'];

var server = http.createServer(function (req, res) {
  if(req.method.toLowerCase() == "post"){
    req.pipe(map(function (chunk) {
      return chunk.toString().toUpperCase()
    })).pipe(res)
  }

  req.on('error', function(err){
    console.log('request error: ' + err)
  })

  res.writeHead(200, { 'content-type': 'text/plain' })

  res.on('error', function(err){
    console.log('response error: ' + err)
  })

}).listen(Number(port))

server.on('error', function(err){
  console.log(err)
})
*/

/*
// ==========================
// exer 13: HTTP JSON API SERVER
var http = require('http');
var url = require('url');
var port = process.argv['2'];

var server = http.createServer(function (req, res) {

  
  if(req.method.toLowerCase() == "get"){
    req_query = url.parse(req.url, true)
    var resp_data = {}

    switch(req_query.pathname){
      case '/api/parsetime':
        var date = new Date(req_query.query.iso)
        resp_data["hour"] = date.getHours()
        resp_data["minute"] = date.getMinutes()
        resp_data["second"] = date.getSeconds()
        break;
      case '/api/unixtime':
        resp_data["unixtime"] = Date.parse(req_query.query.iso)
      default:
        break
    }

    res.writeHead(200, { 'content-type': 'application/json' })
    res.end(JSON.stringify(resp_data))
  }

  req.on('error', function(err){
    console.log('request error: ' + err)
  })

  res.on('error', function(err){
    console.log('response error: ' + err)
  })

}).listen(Number(port))

server.on('error', function(err){
  console.log(err)
})
*/
