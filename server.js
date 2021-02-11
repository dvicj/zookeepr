//11.4.4 - index file is the default 
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

//11.2.6 - use fs library to write data to animals.json
const fs = require('fs');
//11.1.4 
const express = require('express');
//11.1.5 - route the front-end can request data from 
const { animals } = require('./data/animals.json');
//11.1.6 - use 3001, if not default to port 80
const PORT = process.env.PORT || 3001; 
//11.1.4 - instantiate the server
const app = express(); 
//11.2.5 - parse incoming string or array data - middleware functions - must be set up everytime you create a server thats looking to accept post data
app.use(express.urlencoded({ extended: true })); //takes incoming POST data and converts it to key/value pairings that can be accessed in the req.body
// parse incoming JSON data - middleware functions
app.use(express.json()); //takes incoming POST data in the form of JSON and parses it into the req.body
//11.4.4 - tells server that anytime user navigates to the /api, the app will use the router set up in apiRoutes 
app.use('/api', apiRoutes);
//tells server that anytime user navigates to /, the app will use the router set up in htmlRoutes 
app.use('/', htmlRoutes);
//11.3.4 - middleware that instructs the server to make certain files readily available and not gate it behind a server endpoint
//provide a file path to a location (ie. public folder) and instructs server to make these files static resources
app.use(express.static('public'));

//11.1.4 - method to make server listen 
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
}); 