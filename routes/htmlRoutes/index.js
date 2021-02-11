const path = require('path');
const router = require ('express').Router();

//11.3.4 - getting index.html to be served from our express.js server - "/" points to the root route of the server 
router.get('/', (req,res) => { //only job is to respond with an html page to display in the browser
    res.sendFile(path.join(__dirname, '../../public/index.html'));
}); 

//11.3.6 
router.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/animals.html'));
});

router.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/zookeepers.html'));
});

module.exports = router; 