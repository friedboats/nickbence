import * as express from 'express';
import * as mongoose from 'mongoose';
import portfolioRoute from './app/routes/portfolio';
require('dotenv/config');

// APP
const app: express.Application = express();

// MIDDLEWARE in express - fires when a specific route is hit
app.use(express.json()); // Fires on every route
app.use(
  (
    err: ,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
);
app.use('/portfolio', portfolioRoute); // Can do app.use(auth); for all routes

// ROUTES
app.get('/', (req, res, next) => {
  res.send('We are home');
  console.log('app get /');
  next();
});

// DATABASE (MongoDB + Mongoose)
mongoose.connect(
  'mongodb+srv://nickbence:xxXmuS0mUXxQD4Wq@cluster0.in261.mongodb.net/Cluster0?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
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
