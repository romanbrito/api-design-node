import User from '../api/user/userModel';
import { signToken } from './auth';

export const signin = (req, res, next) => {
  // req.user will be there from the middleware
  // verify user. Then we can just create a token
  // and send it back for the client to consume

};