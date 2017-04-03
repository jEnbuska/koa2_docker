"use strict";
const router = require('koa-router')();
const hash = require('random-hash');
const { keys } = Object;
import {resetState} from '../data';
const users = require('../controllers/users');
const todos = require('../controllers/todos');

router.get('/reset', async (ctx) => {
  ctx.body = resetState();
  ctx.status = 200;
});

router.get('/', async (ctx) => {
  ctx.body = {
    getUsers: {method: 'get', url: '/users' },
    getUserById: {method: 'get', url :'/users/:userId'},
    createUser: {method: 'post', url: '/users'},
    updateUser: {method: 'put', url: '/users/:userId'},
    createTodo: {method: 'post', url: '/users/:userId/todos'},
    getTodosByUser: {method:'get', url: '/users/:userId/todos'},
    deleteTodo: {method: 'delete', url: '/users/:userId/todos/:todoId'}
  };
  ctx.status = 200;
});

router.get('/users', users.getUsers);
router.get('/users/:userId', users.getUserById);
router.post('/users', users.createUser);
router.put('/users/:userId', users.updateUser);
router.delete('/users/:userId', users.deleteUser);

router.post('/users/:userId/todos', todos.createTodo);
router.get('/users/:userId/todos', todos.getTodosByUser);
router.delete('/users/:userId/todos/:todoId', todos.deleteTodo);

module.exports=router;