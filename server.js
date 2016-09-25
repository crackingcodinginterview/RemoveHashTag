var path = require('path');
var express = require("express");
var bodyParser = require('body-parser');
var argv = require('yargs').argv;
var app = express();
var port = process.env.PORT || (argv.port || 8008);
var dir = argv.dir || '';
var assetPath = path.join(__dirname, dir);

GLOBAL.ROOTPATH = assetPath;

// Config
app.set('port', port);
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.static(assetPath));

app.use(function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

app.listen(app.get('port'), function (){
  console.log('Express server listening on port ' + app.get('port'));
});

process.on('uncaughtException', function (err){
  if (err) {
    console.error('uncaughtException: ' + err.message);
    console.error(err.stack);
  }
});