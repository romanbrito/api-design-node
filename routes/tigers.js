import {Router} from 'express';
import _ from 'lodash';

const tigerRouter = Router();

let tigers = [];
let id = 0;

const updateId = (req, res, next) => {
  // fill this out. this is the route middleware for the ids
  if (!req.body.id) {
    id++;
    req.body.id = id + '';
  }
  next();
};

tigerRouter.param('id', (req, res, next, id) => {
  // fill this out to find the lion based off the id
  // and attach it to req.lion. Remember to call next()
  let lion = _.find(tigers, {id}); // same as id:id
  if (lion) {
    req.lion = lion;
    next();
  } else {
    res.send(); // send error  with next( new Error() );
  }
});

tigerRouter.get('/', (req, res) => {
  res.json(tigers);
});

tigerRouter.get('/:id', (req, res) => {
  // let lion = _.find(tigers, {id: req.parms.id});
  res.json(req.lion || {});
});

tigerRouter.post('/', updateId, (req, res) => {
  let lion = req.body;
  tigers.push(lion);
  res.json(lion);
});

tigerRouter.put('/:id', (req, res) => {
  let update = req.body;
  if (update.id) {
    delete update.id
  }

  let lion = _.findIndex(tigers, {id: req.params.id});
  if (!tigers[lion]) {
    res.send();
  } else {
    let updatedLion = _.assign(tigers[lion], update);
    res.json(updatedLion);
  }
});

tigerRouter.delete('/:id', (req, res) => {
  let lion = _.findIndex(tigers, {id: req.params.id});

  if (!tigers[lion]) {
    res.send();
  } else {
    let deletedLion = tigers[lion];
    tigers.splice(lion, 1);
    res.json(deletedLion);
  }
});

export default tigerRouter;