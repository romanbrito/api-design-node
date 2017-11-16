import express from 'express';
const app = express();
import api from './api/api'; // router

//setup the app middleware
import middleware from './middleware/appMiddleware';
middleware(app);

// setup the api
app.use('/api/', api);
// setup global error handling


// export the app for testing
export default app;