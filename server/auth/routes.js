import express from 'express';
import * as controller from './controller';

const router = express.Router();
// before we send back a jwt, lets check
// the password and username match what is in the DB
router.post('/signin', controller.signin);

export default router;