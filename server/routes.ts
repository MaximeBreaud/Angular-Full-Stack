import * as express from 'express';

import TeamController from './controllers/TeamController';
import UserController from './controllers/UserController';
// import team from './models/team';
// import user from './models/user';

export default function routes(app) {

  const router = express.Router();

  const team = new TeamController();
  const user = new UserController();

  // teams
  router.route('/teams').get(team.getAll);
  router.route('/teams/count').get(team.count);
  router.route('/team').post(team.insert);
  router.route('/team/:id').get(team.get);
  router.route('/team/:id').put(team.update);
  router.route('/team/:id').delete(team.delete);

  // users
  router.route('/login').post(user.login);
  router.route('/users').get(user.getAll);
  router.route('/users/count').get(user.count);
  router.route('/user').post(user.insert);
  router.route('/user/:id').get(user.get);
  router.route('/user/:id').put(user.update);
  router.route('/user/:id').delete(user.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
