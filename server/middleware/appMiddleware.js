import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
// setup global middleware here

const middleware = app => {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true}));
  app.use(bodyParser.json());
  app.use(cors());
};

export default middleware;