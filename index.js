// where node app starts

// init project
var express = require('express');
var app = express();

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


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Define a route that handles GET requests to /api/:date?
app.get('/api/:date?', (req, res) => {
  // Extract the date parameter from the request
  const dateParam = req.params.date;
  let date;

  // If no date parameter is provided, use the current date
  if (!dateParam) {
    date = new Date();
  // If the date parameter is a number (Unix timestamp), parse it as an integer and create a new Date object
  } else if (!isNaN(dateParam)) {
    date = new Date(parseInt(dateParam));
  // Otherwise, try to create a new Date object using the provided date string
  } else {
    date = new Date(dateParam);
  }

  // If the date is invalid, return a JSON response with an error message
  if (date.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  // Return a JSON response with the Unix timestamp and UTC string representation of the date
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});




// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
