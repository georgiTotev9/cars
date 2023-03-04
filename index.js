// [ ] initialize and configure Express app
// [ ] initialize templating lib
// [ ] create home controller
// [ ] bind routing
// [ ] create layout
// [ ] create data service
// [ ] implement controllers

const express = require('express');
const hbs = require('express-handlebars');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('static'));

app.listen(3000, () => console.log('Server started on port 3000.'));
