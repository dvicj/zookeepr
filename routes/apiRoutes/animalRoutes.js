//11.4.4 - start an instance of router
const router = require('express').Router(); 
const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animals } = require('../../data/animals');

//11.1.5 - get() requires two arguments - first is a string that describes the route the client will have to fetch from
//second is a callback function that will execute everytime that route is accesed with a get request 
// send() method from the res(response) parameter to send string to client 
router.get('/animals', (req,res) => {
    let results = animals; 
    if (req.query) { //11.1.5 
        results = filterByQuery(req.query, results)
    }
    res.json(results); //11.1.5 - edited - to send JSON
});

//11.1.7 - param route must come after the other GET route 
router.get('/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
      res.json(result);
    } else {
      res.send(404);
    }
});

//11.2.3 - app object - created route that listens for post request - client requesting server to accept data
router.post('/animals', (req, res) => {
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

module.exports = router; 