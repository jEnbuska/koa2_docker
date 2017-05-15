"use strict";
const router = require('koa-router')();
const hash = require('random-hash');
const { keys } = Object;
import {resetState} from '../data';
const users = require('../controllers/users');
const todos = require('../controllers/todos');
const auth = require('../controllers/auth');

router.get('/reset', async (ctx) => {
  ctx.body = resetState();
  ctx.status = 200;
});

router.get('/', async (ctx) => {
  ctx.body = {
    getUsers: {
      method: 'get',
      url: '/users',
      response: {
        body: {
          stringId1: {id: 'string',name: 'string',imageUrl:'string'},
          stringId2: {id: 'string',name: 'string',imageUrl:'string'}
        },
        status: 200,
      },
    },
    getUserById: {method: 'get', url :'/users/:userId'},
    createUser: {
      method: 'post',
      url: '/users',
      request: {
        id: 'OPTIONAL-string',
        name: 'string',
        imageUrl: 'string',
      },
      response: {
        body: {id: 'string',name: 'string',imageUrl:'string'},
        status: 200,
      }
    },
    getTodosByUser: {
      method:'get',
      url: '/users/:userId/todos',
      response: {
        body: {
          stringId1: { id: 'string', description: 'string', done:'bool', userId: 'string'},
          stringId2: { id: 'string', description: 'string', done:'bool', userId: 'string'}
        },
        status: 200,
      }
    },
    createTodo: {
      method: 'post',
      url: '/users/:userId/todos',
      request: {
        body: {id: 'OPTIONAL-string', description: 'string'},
      },response: {
        body: {
          stringId1: { id: 'string', description: 'string', done: 'bool', userId: 'string' },
          stringId2: { id: 'string', description: 'string', done: 'bool', userId: 'string' },
        },
        status: 200
      }
    },
    updateUser: {
      method: 'put',
      url: '/users/:userId',
      request: {
        body: {name: 'string',imageUrl: 'string'}
      },
      response: {
        body: {id: 'string',name: 'string',imageUrl:'string'},
        status: 200,
      }
    },
    updateTodo: {
      method: 'put',
      url: '/users/:userId/todos/:todoId',
      request: {
        body: {description: 'string',done: 'bool'}
      },
      response: {
        body: {id: 'string',name: 'string',imageUrl:'string', userId: 'string'},
        status: 200,
      }
    },
    deleteUser: {
      method: 'delete',
      url: '/users/:userId',
      response: {
        status: 204,
      }
    },
    deleteTodo: {
      method: 'delete',
      url: '/users/:userId/todos/:todoId',
      response: {
        status: 204
      }
    }
  };
  ctx.status = 200;
});

router.get('/token', auth.getToken);

router.get('/users', users.getUsers);
router.get('/users/:userId', users.getUserById);
router.post('/users', users.createUser);
router.put('/users/:userId', users.updateUser);
router.delete('/users/:userId', users.deleteUser);

router.post('/users/:userId/todos', todos.createTodo);
router.put('/users/:userId/todos/:todoId', todos.updateTodo);
router.get('/users/:userId/todos', todos.getTodosByUser);
router.delete('/users/:userId/todos/:todoId', todos.deleteTodo);

module.exports=router;