const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Serve the HTML file for the root route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Endpoint to handle date parsing
app.get('/api/:date?', (req, res) => {
  let date;
  
  // Check if date parameter is provided
  if (!req.params.date) {
    // If no date parameter, use current date
    date = new Date();
  } else {
    // If date parameter is a number (unix timestamp)
    if (!isNaN(req.params.date)) {
      date = new Date(parseInt(req.params.date));
    } else {
      // Else, parse the date string
      date = new Date(req.params.date);
    }
  }

  // Check if the date is invalid
  if (date.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    // Return the unix timestamp and UTC date string
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
