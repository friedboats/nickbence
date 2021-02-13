import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';
import portfolioRoute from './app/routes/portfolio';
require('dotenv/config');

// APP
const app = express();

// MIDDLEWARE in express - fires when a specific route is hit
app.use(bodyParser.json()); // Fires on every route
app.use('/portfolio', portfolioRoute); // Can do app.use(auth); for all routes

// ROUTES
app.get('/', (req, res) => {
  res.send('We are home');
});

// DATABASE (MongoDB + Mongoose)
mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (error) => {
  console.log(error);
});
db.once('open', () => {
  console.log('Connected to Database');
});

// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3333');

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  //res.setHeader("Access-Control-Allow-Credentials");

  // Pass to next layer of middleware
  return next();
});

// SERVER
const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Server started at: http://localhost:${port}`);
});
server.on('error', console.error);
