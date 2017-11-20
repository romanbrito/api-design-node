import {Router} from 'express';
const router = Router();
import logger from '../../util/logger';
import * as controller from './postController';

router.param('id', controller.params);

router.route('/')
  .get(controller.get)
  .post(controller.post);

router.route('/:id')
  .get(controller.getOne)
  .put(controller.put)
  .delete(controller.delete);

export default router;