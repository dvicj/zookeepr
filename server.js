//11.1.4 
const express = require('express');
//11.1.6 - use 3001, if not default to port 80
const PORT = process.env.PORT || 3001; 
//11.1.4 - instantiate the server
const app = express(); 
//11.1.5 - route the front-end can request data from 
const { animals } = require('./data/animals.json');

//11.1.5 - filter functionality - will take in req.query as an argument and filter through animals, returning new filtered array
function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    //note that we save the animalsArray as filteredResults here: 
    let filteredResults = animalsArray;
    if(query.personalityTraits) {
        //save personalityTraits as a dedicated array
        //if personalityTraits is a string, place it into a new array and save
        if(typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
            // Loop through each trait in the personalityTraits array:
            personalityTraitsArray.forEach(trait => {
            // Check the trait against each animal in the filteredResults array.
            // Remember, it is initially a copy of the animalsArray,
            // but here we're updating it for each trait in the .forEach() loop.
            // For each trait being targeted by the filter, the filteredResults
            // array will then contain only the entries that contain the trait,
            // so at the end we'll have an array of animals that have every one 
            // of the traits when the .forEach() loop is finished.
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
            });
    } 
    if(query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if(query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if(query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults; 
}

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
//11.1.4 - method to make server listen 
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
}); 