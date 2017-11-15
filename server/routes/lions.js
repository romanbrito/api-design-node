import {Router} from 'express';
import _ from 'lodash';

const lionRouter = Router();

let lions = [];
let id = 0;

const updateId = (req, res, next) => {
  // fill this out. this is the route middleware for the ids
  if (!req.body.id) {
    id++;
    req.body.id = id + '';
  }
  next();
};

lionRouter.param('id', (req, res, next, id) => {
  // fill this out to find the lion based off the id
  // and attach it to req.lion. Remember to call next()
  let lion = _.find(lions, {id}); // same as id:id
  if (lion) {
    req.lion = lion;
    next();
  } else {
    res.send(); // send error  with next( new Error() );
  }
});

lionRouter.get('/', (req, res) => {
  res.json(lions);
});

lionRouter.get('/:id', (req, res) => {
  // let lion = _.find(lions, {id: req.parms.id});
  res.json(req.lion || {});
});

lionRouter.post('/', updateId, (req, res) => {
  let lion = req.body;
  lions.push(lion);
  res.json(lion);
});

lionRouter.put('/:id', (req, res) => {
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

lionRouter.delete('/:id', (req, res) => {
  let lion = _.findIndex(lions, {id: req.params.id});

  if (!lions[lion]) {
    res.send();
  } else {
    let deletedLion = lions[lion];
    lions.splice(lion, 1);
    res.json(deletedLion);
  }
});

export default lionRouter;