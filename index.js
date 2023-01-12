var express = require('express');
var app = express();
const port = process.env.PORT || 3000;


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api', (req, res) => {
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString()
  })
})

app.get('/api/:date', (req, res) => {
  const timestamp = req.params.date;
  let myRegex = /\d*/g;
  console.log(myRegex.test(timestamp))
  
  if (myRegex.test(timestamp) && timestamp.length === 13) {
    return res.json({
      unix: Number(timestamp),
      utc: new Date(Number(timestamp)).toUTCString(),
    })
  }
  if (new Date(timestamp).toUTCString() !== 'Invalid Date') {
    return res.json({
      unix: new Date(timestamp).getTime(),
      utc: new Date(timestamp).toUTCString(),
    })
  }
  res.json({ error: 'Invalid Date'})
})


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(port, function () {
  console.log(`Your app is listening on port ${port}`);
});