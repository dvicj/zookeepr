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
//11.3.4 - middleware that instructs the server to make certain files readily available and not gate it behind a server endpoint
//provide a file path to a location (ie. public folder) and instructs server to make these files static resources
app.use(express.static('public'));
//11.2.6 - use fs library to write data to animals.json
const fs = require('fs');
const path = require('path');

//11.1.5 - get() requires two arguments - first is a string that describes the route the client will have to fetch from
//second is a callback function that will execute everytime that route is accesed with a get request 
// send() method from the res(response) parameter to send string to client 
app.get('/api/animals', (req,res) => {
    let results = animals; 
    if (req.query) { //11.1.5 
        results = filterByQuery(req.query, results)
    }
    res.json(results); //11.1.5 - edited - to send JSON
});

//11.1.7 - param route must come after the other GET route 
app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
      res.json(result);
    } else {
      res.send(404);
    }
});

//11.2.3 - app object - created route that listens for post request - client requesting server to accept data
app.post('/api/animals', (req, res) => {
    //set id based on what the nest index of the array will be
    req.body.id = animals.length.toString(); 

  // if any data in req.body is incorrect, send 400 error back
  if (!validateAnimal(req.body)) {
    res.status(400).send('The animal is not properly formatted.'); //11.2.6 - a response method to relay a message to the client making the request
  } else {
    const animal = createNewAnimal(req.body, animals);
    res.json(animal);
  }
});

//11.3.4 - getting index.html to be served from our express.js server - "/" points to the root route of the server 
app.get('/', (req,res) => { //only job is to respond with an html page to display in the browser
    res.sendFile(path.join(__dirname, './public/index.html'));
}); 

//11.3.6 
app.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, './public/animals.html'));
});

app.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, './public/zookeepers.html'));
});

//11.1.4 - method to make server listen 
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
}); 