import jwt from 'jsonwebtoken';

let users = [];

export const post = (req, res) => {
  const index = users.push(req.body) - 1;

  const user = users[index];
  user.id = index;
  const token = jwt.sign(user.id, '123'); // secret '123' should be passed from env var in production
  res.json({
    firstName: user.firstName,
    token});
};