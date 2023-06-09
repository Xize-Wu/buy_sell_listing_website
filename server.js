// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');
const logoutRoutes = require('./routes/logout');
const showRoutes = require('./routes/show');
const cartRoutes = require('./routes/cart')
const checkoutRoutes = require('./routes/checkout')
const orderRoutes = require('./routes/orders');
const favouritesRoutes = require('./routes/favourites');
const listingsRoutes = require('./routes/listings');
const searchRoutes = require('./routes/search');
const messageRoutes = require('./routes/message');
const newlistingRoutes = require('./routes/my_listing_form');
const markSoldRoutes = require('./routes/mark_sold');
const deleteListingRoutes = require('./routes/deleteListing');


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/logout', logoutRoutes);
app.use('/show', showRoutes);
app.use('/cart', cartRoutes);
app.use('/checkout',checkoutRoutes);
app.use('/orders', orderRoutes);
app.use('/favourites', favouritesRoutes);
app.use('/listings', listingsRoutes);
app.use('/search',searchRoutes);
app.use('/message', messageRoutes)
app.use('/my_listing_form', newlistingRoutes);
app.use('/mark_sold', markSoldRoutes);
app.use('/deleteListing', deleteListingRoutes);
// Note: mount other resources here, using the same pattern above



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});