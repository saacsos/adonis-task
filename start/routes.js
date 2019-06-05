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
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

Route.group(() => {
     Route.get('tasks', 'TaskController.index')
     Route.post('tasks', 'TaskController.store')
     Route.delete('tasks/:id', 'TaskController.destroy')
}).middleware(['auth'])


Route.get('register', ({ view }) => view.render('users.register'))
Route.post('register', 'UserController.register')
     .middleware('guest')

Route.get('login', ({ view }) => view.render('users.login'))
Route.post('login', 'UserController.login')
     .middleware('guest')
Route.get('profile', 'UserController.profile')
     .middleware('auth')
Route.get('logout', 'UserController.logout')
     .middleware('auth')

Route.post("post-sample", 'Api/SampleController.store')
     .prefix('api')

Route.get('file/upload', 'FileUploadController.create')
Route.post('file/upload', 'FileUploadController.store')


// This has to be the last route
// asterisk means everything that has not been declared before
Route.any('*', ({ view }) => view.render('vueapp'))