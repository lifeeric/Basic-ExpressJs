const express = require('express');
const path    = require('path');
const exphbs  = require('express-handlebars');

// MiddleWare
const logger = require('./middleware/logger');

// API
const members = require('./MEMBERS');

const app = express();


// Init middleware
app.use(logger);

// Body Parser Middleware using when creating data(POST req)
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Express-handlebars Engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars')

// HOMEPAGE route
app.get('/', (req, res) => res.render('index', {
    title: "Member App",
    members
}))

// USE static webpage
app.use(express.static(path.join(__dirname, 'public')));

// Router
app.use('/api/members', require('./routes/api/members'));

// PORT
const PORT = process.env.PORT || 5000;

// Listen PORT
app.listen(PORT, () => console.log(`PORT is running on ${PORT}`));