import express from 'express';
import api from './api/api'; // router
import err from './middleware/err';
import config from './config/config';
import mongoose from 'mongoose';
// db.url is different depending on NODE_ENV

mongoose.connect(config.db.url);


//setup the app middleware
import middleware from './middleware/appMiddleware';

const app = express();
middleware(app);

// try curl localhost:3000/api/users
// setup the api
app.use('/api', api);
// setup global error handling
app.use(err());


// export the app for testing
export default app;