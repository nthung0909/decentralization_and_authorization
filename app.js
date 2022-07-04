const express = require('express');
const app = express();

require('./routes')(app);

app.listen(3000, () => {
    console.log('App is running at port 3000');
});