const express = require('express');
//const http = require('http');
const app = express();
const port = 8000;
const hostname = '127.0.0.1';
//const path=require("path");
const request = require("request");
const cors = require("cors");
const bodyParser = require('body-parser')
const url = 'http://api.openweathermap.org/data/2.5/forecast?';


app.listen(port, () => console.log('Listening on port:', port))
//app.use(express.static('/'));
app.use(cors());
app.use(bodyParser.json());

app.post('/',function(req, res) {
  console.log("POST request received");
  let reqBody = req.body;
  let q = reqBody.q;
  console.log("body:",q);
  getForecast(q,id,url, function(err,body){
    if(err) {
      console.log(err);
    } else {
      res.status(200);
      res.send(body);
    }
  });
//  res.status(200);

//  res.send('POST Received');
});

app.get('/', function (req, res) {
  res.status(200);
  res.send('This is my API server');
  console.log("GET request received");
});

app.put('/',function(req, res) {
  res.send('PUT Received');
});
app.delete('/',function(req, res) {
  res.send('Delete Received');
});

function getForecast(q,id,url,callback) {
  request(url+q+'&mode=json&id'+id+'&APPID=09bc75336cf016046646bde45794b338',
   function (error, response, body) {
     if (error || response.statusCode !== 200) {
      return callback(error || {statusCode: response.statusCode});
    }
    callback(null, body);
    console.log('statusCode:', response && response.statusCode);
  });
}
