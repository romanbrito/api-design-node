import morgan from 'morgan';
import bodyParser from 'body-parser';
// setup global middleware here

const middleware = app => {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true}));
  app.use(bodyParser.json());
};

export default middleware;