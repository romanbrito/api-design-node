import User from './userModel';
import _ from 'lodash';

export const params = (req, res, next, id) => {
  User.findByid(id)
    .then((user) => {
    if (!user) {
      next(new Error('No suer with that id'));
    } else {
      req.user = user;
      next();
    }
    }, (err) => {
    next(err);
    })
};

export const get = (req, res, next) => {
  User.find({})
    .then((users) =>{
    res.json(users);
    }, (err) =>{
    next(err);
    })
};

export const getOne = (req, res, next) => {
  // fix me
  const user = req.user;
  res.json(user);
};

export const put = (req, res, next) =>{
  const user = req.user;
  const update = req.body;
  _.merge(user, update);

  user.save((err, saved) =>{
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
};

export const post = (req, res, next) =>{
  const newUser = req.body;

  User.create(newUser)
    .then((user) => {
    res.json(user);
    }, (err) => {
    next(err);
    })
};

export const delete = (req, res, next) =>{
  req.user.remove((err, removed) => {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  })
};