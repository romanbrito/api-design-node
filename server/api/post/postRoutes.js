import {Router} from 'express';
import logger from '../../util/logger';

// setup boilerplate route just to satisfy a request
// for building
Router.route('/')
  .get((req, res) => {
    logger.log('Hey from post!!');
    res.send({ok: true});
  });

export default Router;