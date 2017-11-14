
// TODO: user app.params to find the lion using the id
// and then attach the lion to the req object and call next. Then in
// '/lion/:id' just send back req.lion

// create a middleware function to catch and handle errors, register it
// as the last middleware on app


// create a route middleware for POST /lions that will increment and
// add an id to the incoming new lion object on req.body

import express from 'express';
import bodyParser from 'body-parser';
const app = express();
import _ from 'lodash';
import morgan from 'morgan';

let lions = [];
let id = 0;

const updateId = (req, res, next) => {
  // fill this out. this is the route middleware for the ids
};

app.use(morgan('dev'));
app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true})); // body parser makes it possible to post JSON to the server
app.use(bodyParser.json());                       // we can access data we post on as req.body

app.param('id', function(req, res, next, id) {
  // fill this out to find the lion based off the id
  // and attach it to req.lion. Rember to call next()
});

app.get('/lions', (req, res) => {
  res.json(lions);
});

app.get('/lions/:id', (req, res) => {
  let lion = _.find(lions, {id: req.parms.id});
  res.json(lion || {});
});

app.post('/lions', updateId, (req, res) => {
  let lion = req.body;
  // id++;
  // lion.id = id + '';
  lions.push(lion);
  res.json(lion);
});

app.put('/lions/:id', (req, res) => {
  let update = req.body;
  if (update.id) {
    delete update.id
  }

  let lion = _.findIndex(lions, {id: req.params.id});
  if (!lions[lion]) {
    res.send();
  } else {
    let updatedLion = _.assign(lions[lion], update);
    res.json(updatedLion);
  }
});

app.delete('/lions/:id', (req, res) => {
  let lion = _.findIndex(lions, {id: req.params.id});

  if (!lions[lion]) {
    res.send();
  } else {
    let deletedLion = lions[lion];
    lions.splice(lion, 1);
    res.json(deletedLion);
  }
});

app.listen(3000, () => {
  console.log('listening on 3000');
});
