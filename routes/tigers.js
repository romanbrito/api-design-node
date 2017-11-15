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
  // fill this out to find the tiger based off the id
  // and attach it to req.tiger. Remember to call next()
  let tiger = _.find(tigers, {id}); // same as id:id
  if (tiger) {
    req.tiger = tiger;
    next();
  } else {
    res.send(); // send error  with next( new Error() );
  }
});

tigerRouter.route('/')
  .get( (req, res) => {
  res.json(tigers);
})
  .post(updateId, (req, res) => {
  let tiger = req.body;
  tigers.push(tiger);
  res.json(tiger);
});

tigerRouter.route('/:id')
  .get( (req, res) => {
  // let tiger = _.find(tigers, {id: req.parms.id});
  res.json(req.tiger || {});
})
  .put( (req, res) => {
  let update = req.body;
  if (update.id) {
    delete update.id
  }
  let tiger = _.findIndex(tigers, {id: req.params.id});
  if (!tigers[tiger]) {
    res.send();
  } else {
    let updatedtiger = _.assign(tigers[tiger], update);
    res.json(updatedtiger);
  }
})
  .delete( (req, res) => {
  let tiger = _.findIndex(tigers, {id: req.params.id});

  if (!tigers[tiger]) {
    res.send();
  } else {
    let deletedtiger = tigers[tiger];
    tigers.splice(tiger, 1);
    res.json(deletedtiger);
  }
});

export default tigerRouter;