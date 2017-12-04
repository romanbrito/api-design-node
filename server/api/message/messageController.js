//const messages = [{text: 'some text back', owner: 'Tim'},{text: 'other message back', owner: 'Jane'}];
import Message from './messageModel';

export const params = (req, res, next, user) => {
  const result = messages.filter(message => message.owner == user);
  req.result = result;
  console.log(req.result);
  next();
};

export const get = (req, res, next) => {
  Message.find({})
    .populate('author')
    .exec()
    .then( messages => {
      res.json(messages);
    }, err => {
      next(err)
    })
};

export const getByUser = (req, res, next) => {
  res.json(req.result);
};

export const post = (req, res, next) => {
  messages.push(req.body);
  res.json(req.body);
};