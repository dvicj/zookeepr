//11.1.4 
const express = require('express');
//11.1.4 - instantiate the server
const app = express(); 

//11.1.4 - method to make server listen 
app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
}); 