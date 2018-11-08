'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', ()=>{
  
});

Route.group(()=>{
  Route.post('auth/register', 'UserController.register');
  Route.post('auth/login', 'UserController.login');

  Route.get('projects/:id','ProjectController.index')
  .middleware('auth');
  Route.post('project','ProjectController.create')
  .middleware('auth');
  Route.delete('project/:id','ProjectController.delete')
  .middleware('auth');
  Route.patch('project/:id','ProjectController.update')
  .middleware('auth');

  Route.get('project/:id/tasks','TaskController.index').middleware('auth');
  Route.post('project/:id/tasks','TaskController.create').middleware('auth');

  Route.delete('task/:id','TaskController.delete').middleware('auth');
  Route.patch('task/:id','TaskController.update').middleware('auth');
  

}).prefix('api');

