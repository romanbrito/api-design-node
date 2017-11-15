// TODO: mount the tigers route with a a new router just for tigers
// exactly like lions below
import express from 'express';
import bodyParser from 'body-parser';
const app = express();
import morgan from 'morgan';

app.use(morgan('dev'));
app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true})); // body parser makes it possible to post JSON to the server
app.use(bodyParser.json());                       // we can access data we post on as req.body


import lionRouter from './routes/lions';
import tigerRouter from './routes/tigers';

// this is called mounting. when ever a req comes in for
// '/lion' we want to use this router
app.use('/lions', lionRouter);
app.use('/tiger', tigerRouter);

app.use((err, req, res, next) => {
  if (err) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  }
});

export default app;
