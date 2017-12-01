import {Router} from 'express';
import * as controller from './userController';
import * as auth from '../auth/controller'
const router = Router();

router.get('/me', auth.checkAuthenticated,controller.get);

export default router;