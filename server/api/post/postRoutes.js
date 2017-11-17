import {Router} from 'express';
const router = Router();
import logger from '../../util/logger';

// setup boilerplate route just to satisfy a request
// for building
router.route('/')
  .get((req, res) => {
    logger.log('Hey from post!!');
    res.send({ok: true});
  });

export default router;