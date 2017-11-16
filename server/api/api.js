import {Router} from 'express';

// api router will mount other routers
// for all our resources. Each resource directory
// has a resourceRoutes.js file with the router ready to go,
// require them and mount them to their respective routes below

Router.use('/users', /*require the router*/);
Router.use('/categories', /*require the router*/);
Router.use('posts', /*require the router*/);

export default Router;