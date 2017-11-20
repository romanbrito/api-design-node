import {Router} from 'express';
const router = Router();
import logger from '../../util/logger';
import * as controller from './userController';
import createRoutes from '../../util/createRoutes';

createRoutes(controller, router);

export default router;