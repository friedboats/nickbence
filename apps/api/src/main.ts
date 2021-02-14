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
app.get('/', (req, res, next) => {
  res.send('We are home');
  console.log('app get /');
  next();
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

// SERVER
const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Server started at: http://localhost:${port}`);
});
server.on('error', console.error);
