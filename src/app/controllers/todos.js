"use strict";
const hash = require('random-hash').generateHash;
const users = require('../data').users;

const getTodosByUser = async  (ctx) => {
  const {userId} = ctx.params;
  if(users()[userId]){
    ctx.status = 200;
    ctx.body = users()[userId].todos;
  }else{
    ctx.status = 404;
    ctx.body = 'no such user ' +userId +' found'
  }
};

const createTodo = async (ctx) => {
  const {userId} = ctx.params;
  const user = users()[userId];
  if(user){
    let {id, description} = ctx.request.body;
    if(typeof description === 'string'){
      if(!id){ id = hash(); }
      if(user.todos[id]){
        ctx.body = 'todo with id '+id+' already defined';
        ctx.status = 400;
      }else{
        const newTodo = {id, description, done:false, userId, };
        user.todos[newTodo.id] = newTodo;
        ctx.body = user.todos;
        ctx.status=200;
      }
    }else{
      ctx.body = 'description must be of type string, got'+ {description};
      ctx.status = 400;
    }
  }else{
    ctx.status = 404;
    ctx.body = 'No such user ' + userId;
  }
};

const updateTodo = async (ctx) => {
  const {userId, todoId} = ctx.params;
  const user = users()[userId];
  if(user){
    const { todos, } = user;
    const todo = todos[todoId];
    if(todo){
      const {description, done} = ctx.request.body;
      if(description && typeof description === 'string' && typeof done  === 'boolean' ){
        user.todos[todo.id] = {...todo, description, done};
        ctx.status = 200;
        ctx.body = user.todos;
      }else{
        ctx.body = 'Invalid description ' + description + ' or done ' + done;
        ctx.status = 400;
      }
    }else{
      ctx.status = 404;
      ctx.body = 'no such todo ' + todoId;
    }
  }else{
    ctx.body = 'no such user '+ {userId};
    ctx.status = 404;
  }
};


const deleteTodo = async (ctx) => {
  const {userId, todoId} = ctx.params;
  const user = users()[userId];
  if(user){
    const {todos} = user;
    const todo = todos[todoId];
    if(todo){
      delete todos[todoId];
      ctx.status = 200;
      ctx.body = todos;
    }else{
      ctx.status = 404;
      ctx.body = 'no such todo ' + todoId;
    }
  }else{
    ctx.body = 'no such user '+ {userId};
    ctx.status = 404;
  }
};

module.exports = {getTodosByUser, createTodo, updateTodo, deleteTodo};
